// js/app.js
import Auth from './auth.js';
import Playlist from './playlist.js';
import History from './history.js';
import Timer from './timer.js';
import Player from './player.js';
import Particles from './particles.js';

const App = {
    user: null,

    init() {
        console.log("Iniciando App...");
        Auth.initAuth(async (user) => {
            if (user) {
                console.log("Usuário autenticado:", user.displayName);
                try {
                    this.user = user;
                    Timer.init(user);
                    await Playlist.init(user);
                    this.setupRouter();
                } catch (error) {
                    console.error("Erro na inicialização do App:", error);
                    document.getElementById('router-view').innerHTML = `
                        <div class="empty-state">
                            <p>Erro crítico ao carregar o aplicativo. Verifique sua conexão e configurações do Firebase.</p>
                        </div>
                    `;
                }
            } else {
                console.log("Nenhum usuário logado.");
            }
        });
    },

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRoute());
        // Força a rota inicial
        if (!window.location.hash) window.location.hash = 'home';
        this.handleRoute();
        this.setupNav();
    },

    async handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const container = document.getElementById('router-view');
        
        if (!container) return;

        // Exibe loading
        container.innerHTML = `
            <div style="height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
                <div class="spinner"></div>
                <p style="color: var(--text-dim);">Sincronizando...</p>
            </div>
        `;

        try {
            const content = await this.renderView(hash);
            container.innerHTML = content;
            
            this.updateActiveNav(hash);
            await this.initializeViewLogic(hash);
            if (window.lucide) lucide.createIcons();
        } catch (error) {
            console.error("Erro ao carregar rota:", error);
            container.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="alert-circle" style="color: #ef4444;"></i>
                    <p>Ocorreu um erro ao carregar esta tela.</p>
                    <button class="btn-primary" onclick="window.location.reload()">Tentar Novamente</button>
                </div>
            `;
            if (window.lucide) lucide.createIcons();
        }
    },

    async renderView(hash) {
        switch(hash) {
            case 'home': return await this.viewHome();
            case 'playlist': return this.viewPlaylist();
            case 'timer': return this.viewTimer();
            case 'history': return await this.viewHistory();
            case 'settings': return this.viewProfile();
            default: return await this.viewHome();
        }
    },

    async viewHome() {
        const history = await History.getHistory(this.user.uid);
        
        const totalSessions = history.length;
        const totalTime = history.reduce((a, b) => a + b.duration, 0);
        const avgScore = totalSessions > 0 ? Math.round(history.reduce((a, b) => a + (b.score || 0), 0) / totalSessions) : 0;
        const last = history[0] || null;

        const statsHTML = `
            <div class="stats-grid">
                <div class="card glass stat-card">
                    <i data-lucide="star"></i>
                    <span class="label">Score Médio</span>
                    <span class="value">${avgScore || '--'}</span>
                    <span class="subtext">Baseado em ${totalSessions} sessões</span>
                </div>
                <div class="card glass stat-card">
                    <i data-lucide="clock"></i>
                    <span class="label">Tempo Total</span>
                    <span class="value">${totalTime}m</span>
                    <span class="subtext">Minutos de relaxamento</span>
                </div>
                <div class="card glass stat-card">
                    <i data-lucide="zap"></i>
                    <span class="label">Sessões</span>
                    <span class="value">${totalSessions}</span>
                    <span class="subtext">Ritual de sono ativo</span>
                </div>
                <div class="card glass stat-card">
                    <i data-lucide="calendar"></i>
                    <span class="label">Frequência</span>
                    <span class="value">${totalSessions > 0 ? 'Ativa' : '--'}</span>
                    <span class="subtext">Consistência mensal</span>
                </div>
            </div>

            <h3 style="margin: 32px 0 16px; font-size: 18px;">Última Sessão</h3>
            ${last ? `
                <div class="card glass last-session-card fade-in">
                    <div class="last-session-info">
                        <p style="color: var(--primary); font-weight: 700; font-size: 10px; text-transform: uppercase; margin-bottom: 4px;">${last.date}</p>
                        <h4>${last.soundName}</h4>
                        <p>Duração: ${last.duration} min</p>
                    </div>
                    <div class="score-badge">${last.score}</div>
                </div>
            ` : `
                <div class="card glass" style="text-align: center; padding: 40px; color: var(--text-dim);">
                    <i data-lucide="moon" style="width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                    <p>Nenhuma sessão registrada. Comece seu ritual hoje!</p>
                </div>
            `}
        `;

        return `
            <div class="hero-banner hero-particles">
                <div class="particle-field"></div>

                <div class="hero-orb orb-one"></div>
                <div class="hero-orb orb-two"></div>

                <div class="hero-overlay">
                    <div class="hero-info">
                        <span class="relax-tag">Relax</span>
                        <h1>Olá, ${this.user.displayName.split(' ')[0]}</h1>
                        <p>Pronto para relaxar?</p>
                    </div>
                    <img src="${this.user.photoURL}" class="user-avatar-top" alt="Profile">
                </div>
            </div>
            <div class="content-section">
                ${statsHTML}
                <div style="display: flex; justify-content: space-between; align-items: center; margin: 40px 0 16px;">
                    <h3 style="font-size: 18px;">Recomendados</h3>
                    <a href="#playlist" style="color: var(--primary); font-size: 12px; font-weight: 600; text-decoration: none;">Ver todos</a>
                </div>
                <div id="recommended-list"></div>
            </div>
        `;
    },

    viewPlaylist() {
        return `
            <div class="content-section" style="padding-top: 64px;">
                <div style="margin-bottom: 32px;">
                    <h2 style="font-size: 28px; margin-bottom: 8px;">Sons Relaxantes</h2>
                    <p style="color: var(--text-dim);">Escolha a trilha perfeita para seu descanso.</p>
                </div>
                <div id="full-playlist-list"></div>
            </div>
        `;
    },

    viewTimer() {
        return `
            <div class="content-section" style="padding-top: 64px;">
                <div id="timer-app-container" class="timer-container fade-in">
                    <!-- Conteúdo dinâmico via timer.js -->
                </div>
            </div>
        `;
    },

    async viewHistory() {
        return `
            <div class="content-section" style="padding-top: 64px;">
                <h2 style="margin-bottom: 24px;">Seu Histórico</h2>
                <div id="history-container"></div>
            </div>
        `;
    },

    viewProfile() {
        return `
            <div class="content-section" style="padding-top: 64px; text-align: center;">
                <h2 style="margin-bottom: 32px;">Seu Perfil</h2>
                <div class="card glass">
                    <img src="${this.user.photoURL}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid var(--primary); padding: 4px; margin-bottom: 16px;">
                    <h3 style="margin-bottom: 4px;">${this.user.displayName}</h3>
                    <p style="color: var(--text-dim); font-size: 14px; margin-bottom: 32px;">${this.user.email}</p>
                    <button class="btn-primary" style="width: 100%; background: #ef4444;" onclick="window.AppActions.logout()">Sair da Conta</button>
                </div>
                <p style="margin-top: 40px; color: var(--text-dim); font-size: 12px;">SleepDev v1.0.0</p>
            </div>
        `;
    },

    async initializeViewLogic(hash) {
        if (hash === 'home') {
            Playlist.render('recommended-list');
            Particles.init();
        } else if (hash === 'playlist') {
            Playlist.render('full-playlist-list');
        } else if (hash === 'timer') {
            Timer.updateUI();
        } else if (hash === 'history') {
            const data = await History.getHistory(this.user.uid);
            History.render('history-container', data);
        }
    },

    setupNav() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                window.location.hash = item.getAttribute('href').slice(1);
            };
        });
    },

    updateActiveNav(hash) {
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemHash = item.getAttribute('href').slice(1);
            item.classList.toggle('active', itemHash === hash);
        });
    }
};

// Global actions for HTML onclicks
window.AppActions = {
    logout: () => Auth.logout(),
    startTimer: (min) => Timer.start(min),
    startCustomTimer: () => {
        const val = document.getElementById('custom-minutes').value;
        Timer.start(parseInt(val));
    },
    pauseTimer: () => Timer.pause(),
    resumeTimer: () => Timer.resume(),
    stopTimer: () => Timer.stop(),
    resetTimer: () => Timer.reset(),
    finishSession: () => Timer.complete(false),
    toggleFavorite: (id) => Playlist.toggleFavorite(id),
    togglePlay: (url, id) => Player.togglePlay(url, id),
    togglePlayCurrent: () => {
        if (Player.audio.paused) Player.audio.play();
        else Player.audio.pause();
    },
    filterSounds: (cat) => Playlist.setFilter(cat),
    searchSounds: (query) => Playlist.setSearch(query)
};

App.init();
export default App;
