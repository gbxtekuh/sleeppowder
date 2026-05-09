import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import Icon from '../components/Icon';

export default function Login() {
  const { loginWithGoogle, user, loading } = useAuth();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [loading, user, navigate]);

  async function handleLogin() {
    setWorking(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Não foi possível autenticar. Tente novamente.');
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="login-page">
      <div className="particles">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="login-card glass">
        <div className="logo-circle">
          <Icon name="Moon" size={28} color="white" />
        </div>
        <h1>SleepDev</h1>
        <p>Seu ritual de sono inteligente</p>
        <button className="btn-google" type="button" onClick={handleLogin} disabled={working}>
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.4 4.5 24 4.5 12.9 4.5 4 13.4 4 24.5S12.9 44.5 24 44.5 44 35.6 44 24.5c0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.4 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"/>
            <path fill="#4CAF50" d="M24 44.5c5.1 0 9.8-1.7 13.4-4.6l-6.2-5.1C29.1 36.5 26.7 37.5 24 37.5c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.7 40.3 16.4 44.5 24 44.5z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.5 5.5-6.8 6.8l6.2 5.1C39.5 36.4 44 31 44 24.5c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          {working ? 'Entrando...' : 'Entrar com Google'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}
