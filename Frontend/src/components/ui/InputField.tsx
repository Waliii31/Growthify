import type React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-outline uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">{icon}</div>}
        <input
          className={`w-full bg-surface-lowest border border-outline-variant hover:border-outline text-on-surface text-sm rounded-lg p-2.5 outline-hidden focus:ring-1 focus:ring-primary focus:border-primary ${
            icon ? 'pl-10' : 'px-3'
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
