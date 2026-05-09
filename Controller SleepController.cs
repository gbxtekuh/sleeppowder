const Player = {
    audio: document.getElementById('global-audio'),
    currentSound: null,
    currentSoundName: "Relaxamento",
    currentSoundIcon: "music",
    isPlaying: false,
    isLoading: false,

    init() {
        this.audio = document.getElementById('global-audio');
        if (!this.audio) {
            setTimeout(() => this.init(), 100);
            return;
        }
        
        // Configurações base para melhor compatibilidade
        this.audio.crossOrigin = "anonymous";
        this.audio.volume = 1.0;
        
        this.createFloatingPlayer();
        
        this.audio.onloadstart = () => {
            this.isLoading = true;
            this.updateUI();
        };

        this.audio.oncanplay = () => {
            this.isLoading = false;
            this.updateUI();
        };

        this.audio.onplay = () => { 
            this.isPlaying = true; 
            this.isLoading = false;
            this.updateUI(); 
            this.showFloatingPlayer();
        };
        
        this.audio.onpause = () => { 
            this.isPlaying = false; 
            this.updateUI(); 
        };

        this.audio.onended = () => { 
            this.isPlaying = false; 
            this.updateUI(); 
        };

        this.audio.ontimeupdate = () => {
            this.updateProgress();
        };
        
        // Tratamento de Erro Detalhado
        this.audio.onerror = (e) => {
            this.isLoading = false;
            this.isPlaying = false;
            console.error("ERRO DE ÁUDIO:", {
                src: this.audio.src,
                error: this.audio.error,
                code: this.audio.error ? this.audio.error.code : 'unknown'
            });
            
            let msg = "Não foi possível carregar este áudio.";
            if (window.location.protocol === 'file:') {
                msg += " Dica: Tente rodar o projeto usando um servidor local (como Live Server no VS Code).";
            } else {
                msg += " Tente outro som ou verifique sua conexão.";
            }
            
            alert(msg);
            this.updateUI();
        };
    },

    createFloatingPlayer() {
        if (document.querySelector('.floating-player')) return;
        
        const fp = document.createElement('div');
        fp.className = 'floating-player glass';
        fp.innerHTML = `
            <div class="music-thumb" id="fp-thumb" style="width: 44px; height: 44px; border-radius: 12px;">
                <i data-lucide="music" style="width: 20px; height: 20px;"></i>
            </div>
            <div class="fp-info">
                <h5 id="fp-name">Nenhum som tocando</h5>
                <div class="fp-progress-container">
                    <div class="fp-progress-bar" id="fp-progress"></div>
                </div>
            </div>
            <div class="fp-controls">
                <button class="fp-btn" onclick="window.AppActions.togglePlayCurrent()">
                    <i data-lucide="play" id="fp-play-icon"></i>
                </button>
                <button class="fp-btn" onclick="window.Player.hideFloatingPlayer()">
                    <i data-lucide="x" style="width: 18px; height: 18px; opacity: 0.5;"></i>
                </button>
            </div>
        `;
        document.body.appendChild(fp);
        if (window.lucide) lucide.createIcons();
    },

    async togglePlay(soundUrl, soundId) {
        if (!this.audio) this.init();
        
        const Playlist = (await import('./playlist.js')).default;
        const soundObj = Playlist.sounds.find(s => s.id === soundId);
        
        if (soundObj) {
            this.currentSoundName = soundObj.title;
            this.currentSoundIcon = soundObj.icon || "music";
            
            // Atualiza floating player info
            document.getElementById('fp-name').textContent = this.currentSoundName;
            const thumb = document.getElementById('fp-thumb');
            thumb.style.background = `linear-gradient(135deg, ${soundObj.color}, var(--bg-dark))`;
            thumb.innerHTML = `<i data-lucide="${this.currentSoundIcon}" style="width: 20px; height: 20px;"></i>`;
            if (window.lucide) lucide.createIcons();
        }

        if (this.currentSound === soundId) {
            if (this.audio.paused) {
                await this.audio.play().catch(err => console.error("Erro ao dar play:", err));
            } else {
                this.audio.pause();
            }
        } else {
            this.currentSound = soundId;
            this.audio.src = soundUrl;
            this.audio.load();
            await this.audio.play().catch(err => console.error("Erro ao iniciar áudio:", err));
        }
    },

    updateUI() {
        const playButtons = document.querySelectorAll('.play-btn');
        playButtons.forEach(btn => {
            const id = btn.dataset.soundId;
            const icon = btn.querySelector('i');
            if (icon) {
                if (id === this.currentSound) {
                    if (this.isLoading) {
                        icon.setAttribute('data-lucide', 'loader');
                        icon.classList.add('spin');
                    } else if (this.isPlaying) {
                        icon.setAttribute('data-lucide', 'pause');
                        btn.closest('.music-card')?.classList.add('playing');
                    } else {
                        icon.setAttribute('data-lucide', 'play');
                        btn.closest('.music-card')?.classList.remove('playing');
                    }
                } else {
                    icon.setAttribute('data-lucide', 'play');
                    icon.classList.remove('spin');
                    btn.closest('.music-card')?.classList.remove('playing');
                }
            }
        });

        const fpPlayIcon = document.getElementById('fp-play-icon');
        if (fpPlayIcon) {
            if (this.isLoading) {
                fpPlayIcon.setAttribute('data-lucide', 'loader');
            } else {
                fpPlayIcon.setAttribute('data-lucide', this.isPlaying ? 'pause' : 'play');
            }
        }

        if (window.lucide) lucide.createIcons();
    },

    updateProgress() {
        const progress = document.getElementById('fp-progress');
        if (progress && this.audio.duration) {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            progress.style.width = `${percent}%`;
        }
    },

    showFloatingPlayer() {
        const fp = document.querySelector('.floating-player');
        if (fp) fp.classList.add('active');
    },

    hideFloatingPlayer() {
        const fp = document.querySelector('.floating-player');
        if (fp) {
            fp.classList.remove('active');
            this.audio.pause();
        }
    }
};

window.Player = Player;
Player.init();
export default Player;