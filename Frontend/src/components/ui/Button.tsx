import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ai' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display rounded-lg font-semibold transition-all duration-150 ease-in-out cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-linkedin shadow-sm',
    secondary: 'bg-white border border-outline-variant text-on-surface hover:bg-surface-low shadow-xs',
    ai: 'ai-gradient-bg text-white hover:opacity-95 shadow-md hover:shadow-lg',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-low',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2 inline-flex items-center">{icon}</span>}
    </button>
  );
};
