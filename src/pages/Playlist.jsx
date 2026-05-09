import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { usePlayer } from '../PlayerProvider';
import { saveFavorites } from '../services/firestoreService';
import { useSounds, useRealtimeFavorites } from '../hooks/useFirestore';
import Icon from '../components/Icon';

const categories = ['Todos', 'Chuva', 'Natureza', 'Mar', 'Foco', 'Sono'];

export default function Playlist() {
  const { user } = useAuth();
  const { currentSound, isPlaying, isLoading, playSound } = usePlayer();
  const { sounds, loading: soundsLoading } = useSounds();
  const { favorites, loading: favoritesLoading, setFavorites } = useRealtimeFavorites(user?.uid);
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSounds = useMemo(() => {
    return sounds
      .filter((sound) => filter === 'Todos' || sound.category === filter)
      .filter((sound) =>
        sound.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sound.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [sounds, filter, searchQuery]);

  async function handleToggleFavorite(soundId) {
    if (!user) return;
    const next = new Set(favorites);
    if (next.has(soundId)) {
      next.delete(soundId);
    } else {
      next.add(soundId);
    }
    setFavorites(next);
    await saveFavorites(user.uid, Array.from(next));
  }

  const isLoading = soundsLoading || favoritesLoading;

  return (
    <div className="content-section" style={{ paddingTop: 64 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Sons Relaxantes</h2>
        <p style={{ color: 'var(--text-dim)' }}>Escolha a trilha perfeita para seu descanso.</p>
      </div>

      <div className="search-container">
        <Icon name="Search" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar sons..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="filter-chips">
        {categories.map((category) => (
          <div
            key={category}
            className={`chip ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {filteredSounds.length === 0 ? (
        <div className="empty-state">
          <Icon name="SearchX" size={48} style={{ opacity: 0.3 }} />
          <p>Nenhum som encontrado para sua busca.</p>
        </div>
      ) : (
        <div className="music-grid">
          {filteredSounds.map((sound) => {
            const active = sound.id === currentSound && isPlaying;
            return (
              <div key={sound.id} className={`music-card ${active ? 'playing' : ''}`}>
                <div className="music-thumb" style={{ background: `linear-gradient(135deg, ${sound.color}, var(--bg-dark))` }}>
                  <Icon name={sound.icon} size={28} color="white" />
                </div>

                <div className="music-info">
                  <div className="music-meta">{sound.category} • {sound.duration}</div>
                  <h4>{sound.title}</h4>
                  <p>{sound.description}</p>
                </div>

                <div className="music-actions">
                  <button
                    className={`favorite-btn ${favorites.has(sound.id) ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleToggleFavorite(sound.id)}
                  >
                    <Icon name="Heart" size={18} />
                  </button>
                  <button className="play-btn" type="button" onClick={() => playSound(sound)}>
                    <Icon name={isLoading && sound.id === currentSound ? 'Loader2' : active ? 'Pause' : 'Play'} size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
