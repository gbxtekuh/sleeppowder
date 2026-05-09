import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { getHistory } from '../services/firestoreService';
import Icon from '../components/Icon';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadHistory() {
      if (!user) return;
      const data = await getHistory(user.uid);
      if (mounted) {
        setHistory(data);
        setLoading(false);
      }
    }

    loadHistory();
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <div className="content-section" style={{ paddingTop: 64 }}>
      <h2 style={{ marginBottom: 24 }}>Seu Histórico</h2>
      {loading ? (
        <div className="empty-state">
          <p>Carregando histórico...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <Icon name="Moon" size={48} style={{ opacity: 0.3 }} />
          <p>Você ainda não possui sessões registradas.</p>
        </div>
      ) : (
        history.map((item) => (
          <div key={item.id} className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{item.date}</p>
                <h4 style={{ margin: '4px 0' }}>{item.soundName}</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.score}</span>
                <p style={{ fontSize: 10 }}>Score</p>
              </div>
            </div>
            <p style={{ fontSize: 14, marginTop: 8 }}>Duração: {item.duration} min</p>
          </div>
        ))
      )}
    </div>
  );
}
