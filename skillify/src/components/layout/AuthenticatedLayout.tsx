
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AuthenticatedLayout = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="md:hidden">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
