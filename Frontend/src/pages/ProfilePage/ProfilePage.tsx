import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, CreditCard, Calendar, LogOut } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-black text-on-surface mb-2">My Profile</h1>
          <p className="text-on-surface-variant">Manage your account settings and preferences.</p>
        </div>

        {/* Profile Details Card */}
        <Card className="flex flex-col md:flex-row items-start md:items-center gap-8 p-6 sm:p-8">
          <div className="shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary text-white flex items-center justify-center font-display font-black text-4xl sm:text-5xl shadow-md border-4 border-primary/20">
              {getInitials(user.name)}
            </div>
          </div>
          <div className="grow space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">{user.name}</h2>
              <div className="flex items-center gap-2 text-on-surface-variant mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-surface-low px-4 py-2 rounded-lg border border-outline-variant/50">
                <CreditCard className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-on-surface">Free Monthly Quota</p>
                  <p className="text-xs text-on-surface-variant">10 AI analyses per calendar month</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-low px-4 py-2 rounded-lg border border-outline-variant/50">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-on-surface">
                  Member since {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hoverGlow className="p-6">
            <h3 className="text-lg font-bold text-on-surface mb-4">Free Access</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              This account uses the free monthly quota. You can create up to 10 AI-powered post analyses every calendar month, and your credits reset automatically.
            </p>
          </Card>
          
          <Card hoverGlow className="p-6">
            <h3 className="text-lg font-bold text-on-surface mb-4">Account Security</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Logout of your account. In the future, you will be able to change your password and manage active sessions here.
            </p>
            <Button variant="ghost" onClick={handleLogout} className="text-rose-600 border border-rose-200 hover:bg-rose-50" icon={<LogOut className="w-4 h-4" />}>
              Sign Out
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
