import type React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md' }) => {
  const dimensions: Record<string, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      className={`${dimensions[size]} rounded-full object-cover border-2 border-surface-low`}
    />
  ) : (
    <div
      className={`${dimensions[size]} rounded-full bg-surface-high font-display font-bold text-on-surface-variant flex items-center justify-center border border-outline-variant/30`}
    >
      {initials}
    </div>
  );
};
