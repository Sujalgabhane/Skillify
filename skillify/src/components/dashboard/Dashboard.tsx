
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, 
  FileUp, 
  Award, 
  Route, 
  Calendar, 
  MessageSquare, 
  Video,
  PieChart,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const Dashboard = () => {
  const { user, cvUploaded, dreamJobSet } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user && !cvUploaded) {
      toast({
        title: "Welcome to DreamJob Blueprint",
        description: "Start by uploading your CV to create your personalized career roadmap",
      });
    }
  }, []);

  const renderProgress = () => {
    if (!user) return 0;
    if (!cvUploaded) return 20;
    if (!dreamJobSet) return 40;
    
    // Calculate progress based on roadmap items completion
    if (user.roadmap) {
      const completedItems = user.roadmap.filter(item => item.status === 'completed').length;
      const totalItems = user.roadmap.length;
      return Math.round((completedItems / totalItems) * 100);
    }
    
    return 60;
  };

  const progress = renderProgress();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dream-800">Dashboard</h1>
        <p className="text-gray-500">Track your progress toward your dream job</p>
      </header>

      {/* Welcome card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {user ? `Welcome back, ${user.name}!` : 'Welcome to DreamJob Blueprint!'}
              </h2>
              <p className="text-gray-500 mb-4">
                {user && dreamJobSet
                  ? `You're on your way to becoming a ${user.dreamJob}`
                  : 'Your personalized career guidance platform'}
              </p>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Button 
                onClick={() => navigate(cvUploaded ? (dreamJobSet ? '/roadmap' : '/dream-job') : '/upload-cv')}
                className="w-full md:w-auto bg-dream-600 hover:bg-dream-700"
              >
                {!cvUploaded ? 'Upload Your CV' : !dreamJobSet ? 'Set Dream Job' : 'View Your Roadmap'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PieChart className="mr-2 text-dream-600" size={20} />
          Your Progress
        </h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Career Blueprint Completion</span>
              <span className="text-sm font-medium text-dream-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-dream-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className={`p-4 rounded-lg border ${cvUploaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center">
                  {cvUploaded ? (
                    <CheckCircle2 className="text-green-500 mr-2" size={18} />
                  ) : (
                    <FileUp className="text-gray-400 mr-2" size={18} />
                  )}
                  <span className={`text-sm font-medium ${cvUploaded ? 'text-green-700' : 'text-gray-600'}`}>
                    CV Uploaded
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${dreamJobSet ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center">
                  {dreamJobSet ? (
                    <CheckCircle2 className="text-green-500 mr-2" size={18} />
                  ) : (
                    <Award className="text-gray-400 mr-2" size={18} />
                  )}
                  <span className={`text-sm font-medium ${dreamJobSet ? 'text-green-700' : 'text-gray-600'}`}>
                    Dream Job Set
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${user?.roadmap ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center">
                  {user?.roadmap ? (
                    <CheckCircle2 className="text-green-500 mr-2" size={18} />
                  ) : (
                    <Route className="text-gray-400 mr-2" size={18} />
                  )}
                  <span className={`text-sm font-medium ${user?.roadmap ? 'text-green-700' : 'text-gray-600'}`}>
                    Roadmap Created
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${user?.schedule ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center">
                  {user?.schedule ? (
                    <CheckCircle2 className="text-green-500 mr-2" size={18} />
                  ) : (
                    <Calendar className="text-gray-400 mr-2" size={18} />
                  )}
                  <span className={`text-sm font-medium ${user?.schedule ? 'text-green-700' : 'text-gray-600'}`}>
                    Schedule Created
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick actions section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-dream-600" size={20} />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Route className="mr-2 text-dream-600" size={18} />
                Career Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View your personalized roadmap to achieve your dream job
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full text-dream-600"
                onClick={() => navigate('/roadmap')}
                disabled={!dreamJobSet}
              >
                View Roadmap
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 text-dream-600" size={18} />
                Study Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and manage your study schedule to stay on track
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full text-dream-600"
                onClick={() => navigate('/schedule')}
                disabled={!dreamJobSet}
              >
                Manage Schedule
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 text-dream-600" size={18} />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get career advice and answers to your questions from our AI
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full text-dream-600"
                onClick={() => navigate('/chatbot')}
              >
                Chat with AI
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Dream job section (conditionally shown) */}
      {dreamJobSet && user?.dreamJob && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 text-dream-600" size={20} />
            Your Dream Job
          </h2>
          
          <Card className="bg-gradient-to-r from-dream-50 to-career-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-dream-800 mb-2">{user.dreamJob}</h3>
              {user.dreamJobDescription && (
                <p className="text-gray-600">{user.dreamJobDescription}</p>
              )}
              <div className="mt-4">
                <Link to="/dream-job" className="text-dream-600 hover:text-dream-700 text-sm font-medium underline">
                  Edit Dream Job
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Mock Interview Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Video className="mr-2 text-dream-600" size={20} />
          Interview Preparation
        </h2>
        
        <Card className="bg-dream-50 border-dream-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-dream-800 mb-2">Ready to practice?</h3>
            <p className="text-gray-600 mb-4">
              Practice mock interviews tailored to your dream job to build confidence and improve your interview skills.
            </p>
            <Button 
              onClick={() => navigate('/interview')}
              className="bg-dream-600 hover:bg-dream-700"
              disabled={!dreamJobSet}
            >
              Start Mock Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
