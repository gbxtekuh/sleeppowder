// js/timer.js
import History from './history.js';

const Timer = {
    timeLeft: 0,
    initialMinutes: 0,
    interval: null,
    user: null,
    isPaused: false,
    isRunning: false,

    init(user) {
        this.user = user;
    },

    start(minutes) {
        if (minutes < 1 || minutes > 120) {
            alert("Por favor, digite um valor entre 1 e 120 minutos.");
            return;
        }

        this.stop();
        this.initialMinutes = minutes;
        this.timeLeft = minutes * 60;
        this.isPaused = false;
        this.isRunning = true;
        this.run();
        this.updateUI();
    },

    run() {
        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateDisplay();
                if (this.timeLeft <= 0) {
                    this.complete(true);
                }
            }
        }, 1000);
    },

    pause() {
        this.isPaused = true;
        this.updateUI();
    },

    resume() {
        this.isPaused = false;
        this.updateUI();
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isRunning = false;
        this.isPaused = false;
        this.updateUI();
    },

    reset() {
        this.stop();
        this.timeLeft = 0;
        this.initialMinutes = 0;
        this.updateUI();
    },

    async complete(isAuto = false) {
        const timeSpentSeconds = (this.initialMinutes * 60) - this.timeLeft;
        const minutesSpent = Math.max(1, Math.round(timeSpentSeconds / 60));
        
        this.stop();

        if (this.user) {
            const score = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
            const Player = (await import('./player.js')).default;
            const soundName = Player.currentSoundName || "Relaxamento";
            
            await History.saveSession(this.user.uid, {
                duration: minutesSpent,
                score: score,
                soundName: soundName
            });
            
            alert(isAuto ? "Sessão concluída e salva no histórico." : `Sessão finalizada! Você relaxou por ${minutesSpent} min. Score: ${score}`);
            window.location.hash = 'history';
        }
    },

    updateDisplay() {
        const display = document.getElementById('timer-display');
        const circle = document.querySelector('.progress-ring .bar');
        
        if (display) {
            const m = Math.floor(this.timeLeft / 60);
            const s = this.timeLeft % 60;
            display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }

        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const totalSeconds = this.initialMinutes * 60;
            const offset = circumference - (this.timeLeft / totalSeconds) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    },

    updateUI() {
        const container = document.getElementById('timer-app-container');
        if (!container) return;

        if (this.isRunning) {
            container.innerHTML = `
                <div class="timer-circle-container">
                    <svg class="progress-ring" width="240" height="240">
                        <defs>
                            <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="var(--primary)" />
                                <stop offset="100%" stop-color="var(--secondary)" />
                            </linearGradient>
                        </defs>
                        <circle class="background" cx="120" cy="120" r="110" />
                        <circle class="bar" cx="120" cy="120" r="110" />
                    </svg>
                    <div id="timer-display">00:00</div>
                </div>

                <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                    ${this.isPaused ? 
                        `<button class="btn-primary" style="flex: 2;" onclick="window.AppActions.resumeTimer()">Continuar</button>` : 
                        `<button class="btn-secondary-timer" onclick="window.AppActions.pauseTimer()">Pausar</button>`
                    }
                    <button class="btn-secondary-timer" style="border-color: #ef4444; color: #ef4444;" onclick="window.AppActions.resetTimer()">Resetar</button>
                </div>
                <button class="btn-primary btn-finish-manual" onclick="window.AppActions.finishSession()">Finalizar Sessão</button>
            `;
            this.updateDisplay();
        } else {
            container.innerHTML = `
                <div style="margin-bottom: 40px;">
                    <h2 style="font-size: 24px; margin-bottom: 8px;">Ritual de Sono</h2>
                    <p style="color: var(--text-dim);">Quanto tempo você quer descansar?</p>
                </div>
                
                <div class="time-selection-grid">
                    <button class="btn-secondary-timer" onclick="window.AppActions.startTimer(5)">5 min</button>
                    <button class="btn-secondary-timer" onclick="window.AppActions.startTimer(10)">10 min</button>
                    <button class="btn-secondary-timer" onclick="window.AppActions.startTimer(15)">15 min</button>
                    <button class="btn-secondary-timer" onclick="window.AppActions.startTimer(30)">30 min</button>
                </div>

                <div style="margin: 24px 0;">
                    <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 12px;">Tempo personalizado (1-120 min)</p>
                    <input type="number" id="custom-minutes" class="custom-time-input" placeholder="Ex: 45" min="1" max="120">
                </div>

                <button class="btn-primary btn-start" onclick="window.AppActions.startCustomTimer()">Iniciar Ritual</button>
                <p style="margin-top: 24px; font-size: 12px; color: var(--text-dim);">Dica: Use fones de ouvido para uma experiência imersiva.</p>
            `;
        }
        
        if (window.lucide) lucide.createIcons();
    }
};

export default Timer;
