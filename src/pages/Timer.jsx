import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { usePlayer } from '../PlayerProvider';
import { saveSession } from '../services/firestoreService';
import { useSounds } from '../hooks/useFirestore';

export default function TimerPage() {
  const { user } = useAuth();
  const { currentSoundName, currentSound } = usePlayer();
  const { sounds } = useSounds();
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const isRunning = timeLeft > 0;

  useEffect(() => {
    if (!isRunning || isPaused) return undefined;

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          completeSession();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, isPaused]);

  const formattedTime = useMemo(() => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const progress = useMemo(() => {
    if (!initialMinutes) return 0;
    const total = initialMinutes * 60;
    return total ? ((total - timeLeft) / total) * 100 : 0;
  }, [initialMinutes, timeLeft]);

  function startTimer(minutes) {
    if (minutes < 1 || minutes > 120) {
      alert('Por favor, digite um valor entre 1 e 120 minutos.');
      return;
    }
    setInitialMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsPaused(false);
  }

  function startCustomTimer() {
    const minutes = Number(customMinutes);
    startTimer(minutes);
  }

  function pauseTimer() {
    setIsPaused(true);
  }

  function resumeTimer() {
    setIsPaused(false);
  }

  function resetTimer() {
    setTimeLeft(0);
    setInitialMinutes(0);
    setIsPaused(false);
  }

  async function completeSession() {
    if (!user) return;

    const minutesSpent = Math.max(1, Math.round((initialMinutes * 60 - timeLeft) / 60));
    const score = Math.floor(Math.random() * 31) + 70;

    // Encontrar o som atual para obter mais detalhes
    const currentSoundData = sounds.find(s => s.id === currentSound);

    await saveSession(user.uid, {
      duration: minutesSpent,
      score,
      soundName: currentSoundName || 'Relaxamento',
      soundId: currentSound || null,
      category: currentSoundData?.category || 'Outros',
      soundColor: currentSoundData?.color || 'var(--primary)',
      soundIcon: currentSoundData?.icon || 'Music',
      completedAt: new Date().toISOString(),
    });

    alert(`Sessão concluída! Você relaxou por ${minutesSpent} min.`);
    setTimeLeft(0);
    setInitialMinutes(0);
    navigate('/history');
  }

  return (
    <div className="content-section" style={{ paddingTop: 64 }}>
      <div id="timer-app-container" className="timer-container fade-in">
        {isRunning ? (
          <>
            <div className="timer-circle-container">
              <svg className="progress-ring" width="240" height="240">
                <defs>
                  <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <circle className="background" cx="120" cy="120" r="110" />
                <circle className="bar" cx="120" cy="120" r="110" style={{ strokeDasharray: `${2 * Math.PI * 110}`, strokeDashoffset: `${2 * Math.PI * 110 * (1 - progress / 100)}` }} />
              </svg>
              <div id="timer-display">{formattedTime}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              {isPaused ? (
                <button className="btn-primary" style={{ flex: 2 }} onClick={resumeTimer}>
                  Continuar
                </button>
              ) : (
                <button className="btn-secondary-timer" onClick={pauseTimer}>
                  Pausar
                </button>
              )}
              <button className="btn-secondary-timer" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={resetTimer}>
                Resetar
              </button>
            </div>
            <button className="btn-primary btn-finish-manual" onClick={completeSession}>
              Finalizar Sessão
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 24, marginBottom: 8 }}>Ritual de Sono</h2>
              <p style={{ color: 'var(--text-dim)' }}>Quanto tempo você quer descansar?</p>
            </div>
            <div className="time-selection-grid">
              {[5, 10, 15, 30].map((minutes) => (
                <button key={minutes} className="btn-secondary-timer" type="button" onClick={() => startTimer(minutes)}>
                  {minutes} min
                </button>
              ))}
            </div>
            <div style={{ margin: '24px 0' }}>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>
                Tempo personalizado (1-120 min)
              </p>
              <input
                type="number"
                id="custom-minutes"
                className="custom-time-input"
                placeholder="Ex: 45"
                min="1"
                max="120"
                value={customMinutes}
                onChange={(event) => setCustomMinutes(event.target.value)}
              />
            </div>
            <button className="btn-primary btn-start" type="button" onClick={startCustomTimer}>
              Iniciar Ritual
            </button>
            <p style={{ marginTop: 24, fontSize: 12, color: 'var(--text-dim)' }}>
              Dica: Use fones de ouvido para uma experiência imersiva.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
