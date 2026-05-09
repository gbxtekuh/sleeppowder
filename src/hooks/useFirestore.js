import { useEffect, useState } from 'react';
import { getSounds, subscribeToHistory, subscribeToFavorites, subscribeToPlaylists, getUserSettings } from '../services/firestoreService';

export function useSounds() {
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadSounds() {
      try {
        const data = await getSounds();
        if (mounted) {
          setSounds(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    }

    loadSounds();

    return () => {
      mounted = false;
    };
  }, []);

  return { sounds, loading, error };
}

export function useRealtimeHistory(uid) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToHistory(uid, (data) => {
      setHistory(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { history, loading };
}

export function useRealtimeFavorites(uid) {
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToFavorites(uid, (ids) => {
      setFavorites(new Set(ids));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { favorites, loading, setFavorites };
}

export function useRealtimePlaylists(uid) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToPlaylists(uid, (data) => {
      setPlaylists(data.filter(p => !p.deleted)); // Filtrar deletados
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { playlists, loading };
}

export function useUserSettings(uid) {
  const [settings, setSettings] = useState({
    volume: 1.0,
    theme: 'dark',
    notifications: true,
    autoPlay: false,
    sleepTimer: 30,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    async function loadSettings() {
      try {
        const data = await getUserSettings(uid);
        setSettings(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        setLoading(false);
      }
    }

    loadSettings();
  }, [uid]);

  return { settings, loading, setSettings };
}