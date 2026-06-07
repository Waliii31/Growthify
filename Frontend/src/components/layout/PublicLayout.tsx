import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header fluid={false} />
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
