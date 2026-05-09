import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import BottomNav from './components/BottomNav';
import FloatingPlayer from './components/FloatingPlayer';
import Login from './pages/Login';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import TimerPage from './pages/Timer';
import HistoryPage from './pages/History';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/playlist" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
        <Route path="/timer" element={<ProtectedRoute><TimerPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {user && (
        <>
          <BottomNav />
          <FloatingPlayer />
        </>
      )}
    </div>
  );
}
