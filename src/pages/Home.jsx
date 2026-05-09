import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { usePlayer } from '../PlayerProvider';
import { getHistory } from '../services/firestoreService';
import { sounds } from '../data/sounds';
import Icon from '../components/Icon';

export default function Home() {
  const { user } = useAuth();
  const { playSound, currentSound, isPlaying, currentSoundName } = usePlayer();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!user) return;
      const data = await getHistory(user.uid);
      if (mounted) {
        setHistory(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const stats = useMemo(() => {
    const totalSessions = history.length;
    const totalTime = history.reduce((sum, item) => sum + (item.duration || 0), 0);
    const avgScore = totalSessions > 0 ? Math.round(history.reduce((sum, item) => sum + (item.score || 0), 0) / totalSessions) : 0;
    const last = history[0] || null;

    return { totalSessions, totalTime, avgScore, last };
  }, [history]);

  const recommended = sounds.slice(0, 3);

  return (
    <div className="content-section">
      <div className="hero-banner hero-particles">
        <div className="particle-field" />
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-overlay">
          <div className="hero-info">
            <span className="relax-tag">Relax</span>
            <h1>Olá, {user?.displayName?.split(' ')[0] || 'amigo'}</h1>
            <p>Pronto para relaxar?</p>
          </div>
          <img className="user-avatar-top" src={user?.photoURL} alt="Avatar" />
        </div>
      </div>

      <div className="stats-grid">
        <div className="card glass stat-card">
          <Icon name="Star" size={28} />
          <span className="label">Score Médio</span>
          <span className="value">{stats.avgScore || '--'}</span>
          <span className="subtext">Baseado em {stats.totalSessions} sessões</span>
        </div>
        <div className="card glass stat-card">
          <Icon name="Clock" size={28} />
          <span className="label">Tempo Total</span>
          <span className="value">{stats.totalTime}m</span>
          <span className="subtext">Minutos de relaxamento</span>
        </div>
        <div className="card glass stat-card">
          <Icon name="Zap" size={28} />
          <span className="label">Sessões</span>
          <span className="value">{stats.totalSessions}</span>
          <span className="subtext">Ritual de sono ativo</span>
        </div>
        <div className="card glass stat-card">
          <Icon name="Calendar" size={28} />
          <span className="label">Frequência</span>
          <span className="value">{stats.totalSessions > 0 ? 'Ativa' : '--'}</span>
          <span className="subtext">Consistência mensal</span>
        </div>
      </div>

      <div style={{ marginTop: 32, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 18 }}>Última Sessão</h3>
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Carregando histórico...</p>
        </div>
      ) : stats.last ? (
        <div className="card glass last-session-card fade-in">
          <div className="last-session-info">
            <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', marginBottom: 4 }}>
              {stats.last.date}
            </p>
            <h4>{stats.last.soundName}</h4>
            <p>Duração: {stats.last.duration} min</p>
          </div>
          <div className="score-badge">{stats.last.score}</div>
        </div>
      ) : (
        <div className="card glass" style={{ textAlign: 'center', padding: 40, color: 'var(--text-dim)' }}>
          <Icon name="Moon" size={48} style={{ opacity: 0.3 }} />
          <p>Nenhuma sessão registrada. Comece seu ritual hoje!</p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0 16px' }}>
        <h3 style={{ fontSize: 18 }}>Recomendados</h3>
        <a href="#/playlist" style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
          Ver todos
        </a>
      </div>

      <div className="music-grid">
        {recommended.map((sound) => {
          const active = sound.id === currentSound && isPlaying;
          return (
            <div key={sound.id} className={`music-card ${active ? 'playing' : ''}`}>
              <div className="music-thumb" style={{ background: `linear-gradient(135deg, ${sound.color}, var(--bg-dark))` }}>
                <Icon name={sound.icon} size={24} color="white" />
              </div>
              <div className="music-info">
                <div className="music-meta">{sound.category} • {sound.duration}</div>
                <h4>{sound.title}</h4>
                <p>{sound.description}</p>
              </div>
              <div className="music-actions">
                <button className="play-btn" type="button" onClick={() => playSound(sound)}>
                  <Icon name={active ? 'Pause' : 'Play'} size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
