:root {
    --bg-dark: #05070a;
    --bg-card: rgba(255, 255, 255, 0.05);
    --primary: #6366f1;
    --primary-glow: rgba(99, 102, 241, 0.3);
    --secondary: #a855f7;
    --text-main: #f8fafc;
    --text-dim: #94a3b8;
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: rgba(0, 0, 0, 0.2);
    --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: transparent;
}

body {
    background: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    background: radial-gradient(circle at top right, #1e1b4b, transparent),
                radial-gradient(circle at bottom left, #2e1065, transparent),
                var(--bg-dark);
}

.glass {
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
}

.hero-banner {
    position: relative;
    width: 100%;
    height: 180px;
    margin-bottom: 32px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    background: #05070a;
}

@media (min-width: 768px) {
    .hero-banner {
        height: 240px;
    }
}

.hero-banner {
    position: relative;
    width: 100%;
    height: 180px;
    margin-bottom: 32px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 18px 45px rgba(0,0,0,0.45);
    background:
        radial-gradient(circle at 20% 20%, rgba(99,102,241,.35), transparent 30%),
        radial-gradient(circle at 80% 30%, rgba(168,85,247,.28), transparent 34%),
        linear-gradient(135deg, #070816, #17123f, #05070a);
}

@media (min-width: 768px) {
    .hero-banner {
        height: 240px;
    }
}

.hero-particles::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to top, rgba(5,7,10,.88), rgba(5,7,10,.18)),
        radial-gradient(circle at center, transparent, rgba(0,0,0,.35));
    z-index: 2;
}

.particle-field {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
}

.particle-field span {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, #fff, rgba(168, 85, 247, 0.4));
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
    pointer-events: none;
    animation: particleFloat infinite linear;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease;
}

.hero-banner:hover .particle-field span {
    opacity: 0.8;
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.8);
}

@keyframes particleFloat {
    0% {
        transform: translate3d(0, 0, 0);
    }
    33% {
        transform: translate3d(15px, -20px, 0);
    }
    66% {
        transform: translate3d(-10px, -40px, 0);
    }
    100% {
        transform: translate3d(0, -60px, 0);
        opacity: 0;
    }
}

.hero-orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(24px);
    opacity: .55;
    z-index: 1;
    transition: transform .45s ease;
}

.orb-one {
    width: 170px;
    height: 170px;
    background: rgba(99,102,241,.45);
    left: 12%;
    top: -40px;
}

.orb-two {
    width: 220px;
    height: 220px;
    background: rgba(168,85,247,.35);
    right: 8%;
    bottom: -90px;
}

.hero-banner:hover .orb-one {
    transform: translate(18px, 14px) scale(1.08);
}

.hero-banner:hover .orb-two {
    transform: translate(-18px, -10px) scale(1.1);
}

.hero-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 24px;
    z-index: 3;
}

.relax-tag {
    background: var(--gradient);
    color: white;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    box-shadow: 0 8px 22px var(--primary-glow);
}

.hero-info h1 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 4px;
}

.hero-info p {
    font-size: 14px;
    color: rgba(255,255,255,0.78);
}

.user-avatar-top {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2px solid var(--primary);
    padding: 2px;
    background: rgba(255,255,255,.08);
}



.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, 
        rgba(5, 7, 10, 0.9) 0%, 
        rgba(5, 7, 10, 0.2) 50%, 
        transparent 100%);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 24px;
    z-index: 2;
}

.hero-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.relax-tag {
    background: var(--primary);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    box-shadow: 0 4px 10px var(--primary-glow);
}

.hero-info h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-info p {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
}

.user-avatar-top {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--primary);
}

.content-section {
    padding: 0 24px;
    margin-bottom: 120px;
    animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.card { border-radius: 28px; padding: 24px; margin-bottom: 16px; }

.nav-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 450px;
    height: 72px;
    border-radius: 36px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 8px;
    z-index: 1000;
    border: 1px solid rgba(255,255,255,0.08);
}

.nav-item {
    color: var(--text-dim);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    transition: 0.3s;
    width: 60px;
}

.nav-item.active { color: var(--primary); transform: translateY(-4px); }
.nav-item i { width: 22px; height: 22px; }

.btn-primary {
    background: var(--gradient);
    border: none;
    color: white;
    padding: 16px 24px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
}

.play-btn {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: var(--gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.player-container { display: flex; align-items: center; gap: 16px; }

.favorite-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
}
.favorite-btn.active { color: #ef4444; }

/* Grid de Estatísticas */
.stats-grid {
    display: grid;
    gap: 16px;
    margin-bottom: 24px;
    grid-template-columns: 1fr;
}

@media (min-width: 640px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(4, 1fr); }
}

.stat-card {
    padding: 24px;
    border-radius: 24px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    overflow: hidden;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.stat-card i {
    width: 32px;
    height: 32px;
    color: var(--primary);
    opacity: 0.8;
}

.stat-card .label {
    font-size: 12px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.stat-card .value {
    font-size: 32px;
    font-weight: 800;
    color: #fff;
}

.stat-card .subtext {
    font-size: 11px;
    color: var(--text-dim);
}

/* Timer Moderno */
.timer-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 24px;
    text-align: center;
}

.timer-circle-container {
    position: relative;
    width: 240px;
    height: 240px;
    margin: 0 auto 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-ring {
    position: absolute;
    inset: 0;
    transform: rotate(-90deg);
}

.progress-ring circle {
    fill: transparent;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s;
}

.progress-ring .background { stroke: rgba(255,255,255,0.05); }
.progress-ring .bar { stroke: url(#timer-gradient); }

#timer-display {
    font-size: 64px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    letter-spacing: -2px;
}

/* Inputs e Seleção de Tempo */
.time-selection-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
}

.custom-time-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 16px;
    color: white;
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 24px;
    outline: none;
    transition: 0.3s;
}

.custom-time-input:focus {
    border-color: var(--primary);
    background: rgba(255,255,255,0.1);
}

.btn-start {
    width: 100%;
    padding: 20px;
    font-size: 18px;
    letter-spacing: 0.5px;
    box-shadow: 0 15px 30px var(--primary-glow);
}

.btn-secondary-timer {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--glass-border);
    color: white;
    padding: 14px 20px;
    border-radius: 16px;
    font-weight: 600;
    flex: 1;
    transition: 0.3s;
}

.btn-secondary-timer:hover {
    background: rgba(255,255,255,0.1);
}

.btn-finish-manual {
    width: 100%;
    margin-top: 16px;
    background: rgba(168, 85, 247, 0.2);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: var(--secondary);
}

.btn-finish-manual:hover {
    background: var(--secondary);
    color: white;
}

/* Utilitários */
.fade-in { animation: fadeIn 0.5s ease forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.last-session-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
}

.last-session-info h4 { font-size: 16px; margin-bottom: 4px; }
.last-session-info p { font-size: 12px; color: var(--text-dim); }

.score-badge {
    background: var(--gradient);
    padding: 8px 16px;
    border-radius: 12px;
    font-weight: 800;
    font-size: 18px;
}

/* Busca e Filtros */
.search-container {
    margin-bottom: 24px;
    position: relative;
}

.search-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 16px 16px 16px 48px;
    color: white;
    outline: none;
    transition: 0.3s;
}

.search-input:focus {
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.1);
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-dim);
    pointer-events: none;
}

.filter-chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 32px;
    scrollbar-width: none;
}

.filter-chips::-webkit-scrollbar { display: none; }

.chip {
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    font-size: 13px;
    color: var(--text-dim);
    white-space: nowrap;
    cursor: pointer;
    transition: 0.3s;
}

.chip.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    box-shadow: 0 4px 12px var(--primary-glow);
}

/* Music Cards Premium */
.music-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .music-grid { grid-template-columns: repeat(2, 1fr); }
}

.music-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    transition: 0.3s;
    position: relative;
}

.music-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
}

.music-card.playing {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
}

.music-thumb {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    background: var(--gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    flex-shrink: 0;
}

.music-thumb i { width: 28px; height: 28px; }

.music-info { flex: 1; overflow: hidden; }
.music-info h4 { font-size: 15px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.music-info p { font-size: 11px; color: var(--text-dim); margin-bottom: 4px; }

.music-meta { display: flex; align-items: center; gap: 8px; font-size: 10px; color: var(--primary); font-weight: 600; text-transform: uppercase; }

.music-actions { display: flex; align-items: center; gap: 8px; }

/* Floating Player */
.floating-player {
    position: fixed;
    bottom: 104px;
    left: 50%;
    transform: translateX(-50%) translateY(120%);
    width: 90%;
    max-width: 450px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 12px 16px;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.floating-player.active { transform: translateX(-50%) translateY(0); }

.fp-info { flex: 1; overflow: hidden; }
.fp-info h5 { font-size: 13px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fp-progress-container { width: 100%; height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 6px; position: relative; }
.fp-progress-bar { height: 100%; background: var(--primary); border-radius: 2px; width: 0%; transition: width 0.1s linear; }

.fp-controls { display: flex; align-items: center; gap: 12px; }
.fp-btn { background: none; border: none; color: white; cursor: pointer; padding: 4px; display: flex; align-items: center; }
.fp-btn.play { background: var(--primary); border-radius: 50%; padding: 8px; box-shadow: 0 4px 10px var(--primary-glow); }

/* Utilitários Extras */
.playing-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;
}
.playing-bars span {
    width: 2px;
    background: var(--primary);
    animation: bar-grow 0.5s ease-in-out infinite alternate;
}
.playing-bars span:nth-child(2) { animation-delay: 0.1s; }
.playing-bars span:nth-child(3) { animation-delay: 0.2s; }

@keyframes bar-grow {
    from { height: 4px; }
    to { height: 12px; }



    
}


