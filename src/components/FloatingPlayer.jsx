import { useEffect, useState } from 'react';
import Icon from './Icon';
import { usePlayer } from '../PlayerProvider';

export default function FloatingPlayer() {
  const { currentSound, currentSoundName, currentSoundIcon, currentSoundColor, isPlaying, isLoading, togglePlayCurrent, stop, audioRef } = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef]);

  if (!currentSound) {
    return null;
  }

  return (
    <div className="floating-player glass active">
      <div className="music-thumb" style={{ background: currentSoundColor }}>
        <Icon name={currentSoundIcon} size={20} color="white" />
      </div>
      <div className="fp-info">
        <h5>{currentSoundName}</h5>
        <div className="fp-progress-container">
          <div className="fp-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="fp-controls">
        <button className="fp-btn" onClick={togglePlayCurrent}>
          <Icon name={isLoading ? 'Loader2' : isPlaying ? 'Pause' : 'Play'} size={18} />
        </button>
        <button className="fp-btn" onClick={stop}>
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}
