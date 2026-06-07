import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout, PublicLayout, WorkspaceLayout, ProtectedRoute } from '@/components/layout';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage, SignupPage } from '@/pages/AuthPage';

/**
 * App shell: delegates routing to nested layout components
 * so each section (auth, public, workspace) has its own structural wrapper.
 */
export default function App() {
  return (
    <div className="min-h-screen font-sans text-on-surface antialiased bg-bg-base">
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Workspace (Dashboard) Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<WorkspaceLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
