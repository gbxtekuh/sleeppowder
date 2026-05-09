import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const items = [
  { to: '/home', label: 'Início', icon: 'Home' },
  { to: '/playlist', label: 'Sons', icon: 'Music' },
  { to: '/timer', label: 'Clock' },
  { to: '/history', label: 'Histórico', icon: 'BarChart2' },
  { to: '/settings', label: 'Perfil', icon: 'User' },
];

export default function BottomNav() {
  return (
    <nav className="nav-bar glass">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <Icon name={item.icon || 'Circle'} size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
