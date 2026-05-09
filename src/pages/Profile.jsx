import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="content-section" style={{ paddingTop: 64, textAlign: 'center' }}>
      <h2 style={{ marginBottom: 32 }}>Seu Perfil</h2>
      <div className="card glass">
        <img
          src={user?.photoURL}
          alt="Avatar"
          style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid var(--primary)', padding: 4, marginBottom: 16 }}
        />
        <h3 style={{ marginBottom: 4 }}>{user?.displayName}</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 32 }}>{user?.email}</p>
        <button className="btn-primary" style={{ width: '100%', background: '#ef4444' }} onClick={handleLogout}>
          Sair da Conta
        </button>
      </div>
      <p style={{ marginTop: 40, color: 'var(--text-dim)', fontSize: 12 }}>SleepDev v1.0.0</p>
    </div>
  );
}
