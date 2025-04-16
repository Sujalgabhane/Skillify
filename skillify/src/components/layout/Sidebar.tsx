
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileUp, 
  Award, 
  Route, 
  Calendar, 
  MessageSquare, 
  Video
} from 'lucide-react';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
};

const SidebarItem = ({ icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start ${isActive ? "bg-dream-100 text-dream-800" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-2">{icon}</div>
        <span>{label}</span>
      </div>
    </Button>
  );
};

const Sidebar = () => {
  const { user, cvUploaded, dreamJobSet } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
      enabled: true,
    },
    {
      icon: <FileUp size={20} />,
      label: 'Upload CV',
      path: '/upload-cv',
      enabled: !cvUploaded,
    },
    {
      icon: <Award size={20} />,
      label: 'Dream Job',
      path: '/dream-job',
      enabled: cvUploaded,
    },
    {
      icon: <Route size={20} />,
      label: 'Roadmap',
      path: '/roadmap',
      enabled: dreamJobSet,
    },
    {
      icon: <Calendar size={20} />,
      label: 'Schedule',
      path: '/schedule',
      enabled: dreamJobSet,
    },
    {
      icon: <MessageSquare size={20} />,
      label: 'AI Assistant',
      path: '/chatbot',
      enabled: true,
    },
    {
      icon: <Video size={20} />,
      label: 'Mock Interviews',
      path: '/interview',
      enabled: dreamJobSet,
    },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-5 border-b">
          <div className="text-lg font-bold text-dream-700">
            Skill<span className="text-career-500">ify</span>
          </div>
          {user && (
            <div className="mt-2 text-sm text-gray-500">
              Welcome, {user.name || 'User'}
            </div>
          )}
        </div>
        <div className="flex-1 p-5 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => 
            item.enabled && (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={currentPath === item.path}
                onClick={() => handleItemClick(item.path)}
              />
            )
          )}
        </div>
        <div className="p-5 border-t">
          <div className="text-xs text-gray-500">
            Your path to success, one step at a time.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
