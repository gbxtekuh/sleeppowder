import * as Icons from 'lucide-react';

export default function Icon({ name, size = 20, color = 'currentColor', ...props }) {
  const Component = Icons[name] || Icons.Music;
  return <Component size={size} color={color} {...props} />;
}
