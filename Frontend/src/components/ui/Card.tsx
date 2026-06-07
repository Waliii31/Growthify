import type React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverGlow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-surface-lowest border border-outline-variant/60 rounded-xl p-6 transition-all duration-300 ${
        hoverGlow
          ? 'hover:shadow-[0_12px_40px_rgba(132,85,239,0.12)] hover:border-secondary-purple/40'
          : 'shadow-xs hover:shadow-sm'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
