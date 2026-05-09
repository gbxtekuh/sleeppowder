import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useUserSettings } from './hooks/useFirestore';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const { user } = useAuth();
  const { settings } = useUserSettings(user?.uid);
  const audioRef = useRef(new Audio());
  const [playerState, setPlayerState] = useState({
    currentSound: null,
    currentSoundName: 'Nenhum som tocando',
    currentSoundIcon: 'Music',
    currentSoundColor: 'var(--primary)',
    isPlaying: false,
    isLoading: false,
  });
  const stateRef = useRef(playerState);

  useEffect(() => {
    stateRef.current = playerState;
  }, [playerState]);

  // Aplicar configurações do usuário
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = settings.volume;
  }, [settings.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.crossOrigin = 'anonymous';
    audio.volume = settings.volume;

    const handlePlay = () => setPlayerState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
    const handlePause = () => setPlayerState((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
    const handleWaiting = () => setPlayerState((prev) => ({ ...prev, isLoading: true }));
    const handleCanPlay = () => setPlayerState((prev) => ({ ...prev, isLoading: false }));
    const handleEnded = () => setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    const handleError = () => {
      console.error('Erro ao reproduzir áudio', audio.error);
      setPlayerState((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [settings.volume]);

  const playSound = useCallback(async (sound) => {
    const audio = audioRef.current;
    if (stateRef.current.currentSound === sound.id) {
      if (audio.paused) {
        await audio.play().catch((error) => console.error('Erro ao retomar áudio:', error));
      } else {
        audio.pause();
      }
      return;
    }

    setPlayerState((prev) => ({
      ...prev,
      currentSound: sound.id,
      currentSoundName: sound.title,
      currentSoundIcon: sound.icon || 'Music',
      currentSoundColor: sound.color || 'var(--primary)',
      isLoading: true,
    }));

    audio.src = sound.audioUrl;
    audio.load();

    try {
      await audio.play();
    } catch (error) {
      console.error('Erro ao iniciar áudio:', error);
    }
  }, []);

  const togglePlayCurrent = useCallback(() => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => console.error('Erro ao retomar áudio:', error));
    } else {
      audio.pause();
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setPlayerState((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
  }, []);

  const value = useMemo(
    () => ({
      ...playerState,
      playSound,
      togglePlayCurrent,
      stop,
      audioRef,
    }),
    [playerState, playSound, togglePlayCurrent, stop]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  return useContext(PlayerContext);
}
