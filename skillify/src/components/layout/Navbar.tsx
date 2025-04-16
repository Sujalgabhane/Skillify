import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-dream-700 font-poppins font-bold text-xl">
                Skill<span className="text-career-500">ify</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              Home
            </Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              Dashboard
            </Link>
            <Link to="/roadmap" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              Roadmap
            </Link>
            <Link to="/schedule" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              Schedule
            </Link>
            <Link to="/chatbot" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              AI Assistant
            </Link>
            <Link to="/interview" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-dream-600">
              Mock Interviews
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={18} />
                  <span className="font-medium">{user.name || 'Profile'}</span>
                </Button>
                <Button onClick={handleSignOut} variant="ghost">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')} className="bg-dream-600 hover:bg-dream-700">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-dream-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/roadmap" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </Link>
            <Link 
              to="/schedule" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link 
              to="/chatbot" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link 
              to="/interview" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dream-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Mock Interviews
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
