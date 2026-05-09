import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { getUserSettings, saveUserSettings } from '../services/firestoreService';
import Icon from '../components/Icon';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    volume: 1.0,
    theme: 'dark',
    notifications: true,
    autoPlay: false,
    sleepTimer: 30,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;
      const data = await getUserSettings(user.uid);
      setSettings(data);
      setLoading(false);
    }

    loadSettings();
  }, [user]);

  async function handleSaveSettings() {
    if (!user) return;
    setSaving(true);

    try {
      await saveUserSettings(user.uid, settings);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  function updateSetting(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return (
      <div className="content-section" style={{ paddingTop: 64, textAlign: 'center' }}>
        <div className="spinner" />
        <p>Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="content-section" style={{ paddingTop: 64 }}>
      <h2 style={{ marginBottom: 32 }}>Configurações</h2>

      <div className="card glass" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Reprodução</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
            Volume padrão: {Math.round(settings.volume * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.autoPlay}
              onChange={(e) => updateSetting('autoPlay', e.target.checked)}
            />
            <span>Iniciar automaticamente o último som</span>
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
            Timer de sono (minutos)
          </label>
          <select
            value={settings.sleepTimer}
            onChange={(e) => updateSetting('sleepTimer', parseInt(e.target.value))}
            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }}
          >
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={45}>45 minutos</option>
            <option value={60}>1 hora</option>
            <option value={90}>1.5 horas</option>
            <option value={120}>2 horas</option>
          </select>
        </div>
      </div>

      <div className="card glass" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Preferências</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
            Tema
          </label>
          <select
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }}
          >
            <option value="dark">Escuro</option>
            <option value="light">Claro</option>
            <option value="auto">Automático</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
            />
            <span>Receber notificações</span>
          </label>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleSaveSettings}
        disabled={saving}
        style={{ width: '100%' }}
      >
        {saving ? (
          <>
            <div className="spinner" style={{ width: 16, height: 16, marginRight: 8 }} />
            Salvando...
          </>
        ) : (
          <>
            <Icon name="Save" size={16} style={{ marginRight: 8 }} />
            Salvar Configurações
          </>
        )}
      </button>
    </div>
  );
}