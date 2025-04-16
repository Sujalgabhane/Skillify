
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Award, Briefcase, Book, Map } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const DreamJobForm = () => {
  const [dreamJob, setDreamJob] = useState('');
  const [dreamJobDescription, setDreamJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { updateUserProfile, setDreamJobSet, user } = useUser();

  // Motivational quotes
  const motivationalQuotes = [
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The best way to predict the future is to create it. - Abraham Lincoln"
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dreamJob.trim()) {
      toast({
        title: "Dream job is required",
        description: "Please enter your dream job title",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock processing and roadmap generation
    setTimeout(() => {
      // Update user profile with dream job
      updateUserProfile({
        dreamJob,
        dreamJobDescription,
        // Sample roadmap items
        roadmap: [
          {
            id: '1',
            title: 'Skill Assessment',
            description: 'Evaluate current skills and identify gaps for your dream job.',
            status: 'not-started',
            timeframe: '1 week'
          },
          {
            id: '2',
            title: 'Learning Essential Skills',
            description: 'Complete online courses and tutorials to gain required skills.',
            status: 'not-started',
            timeframe: '8 weeks'
          },
          {
            id: '3',
            title: 'Build Portfolio Projects',
            description: 'Create projects demonstrating your abilities and skills.',
            status: 'not-started',
            timeframe: '4 weeks'
          },
          {
            id: '4',
            title: 'Resume & Online Presence',
            description: 'Update resume and professional social media profiles.',
            status: 'not-started',
            timeframe: '2 weeks'
          },
          {
            id: '5',
            title: 'Network and Connect',
            description: 'Connect with professionals and attend industry events.',
            status: 'not-started',
            timeframe: 'Ongoing'
          },
          {
            id: '6',
            title: 'Interview Preparation',
            description: 'Research companies and practice common interview questions.',
            status: 'not-started',
            timeframe: '3 weeks'
          }
        ]
      });
      
      setDreamJobSet(true);
      setIsSubmitting(false);
      
      toast({
        title: "Dream Job Set",
        description: "Your personalized roadmap has been created!",
      });
      
      // Navigate to roadmap
      navigate('/roadmap');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-dream-700 flex items-center">
            <Award className="mr-2 text-career-500" />
            Define Your Dream Job
          </CardTitle>
          <CardDescription>
            Tell us about your dream job and career aspirations so we can build your personalized roadmap
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="dreamJob" className="block text-sm font-medium mb-1 flex items-center">
                  <Briefcase className="mr-1 h-4 w-4" />
                  Dream Job Title
                </label>
                <Input
                  id="dreamJob"
                  value={dreamJob}
                  onChange={(e) => setDreamJob(e.target.value)}
                  placeholder="e.g., Senior Software Engineer, UX Designer, Marketing Director"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="dreamJobDescription" className="block text-sm font-medium mb-1 flex items-center">
                  <Book className="mr-1 h-4 w-4" />
                  Why is this your dream job?
                </label>
                <Textarea
                  id="dreamJobDescription"
                  value={dreamJobDescription}
                  onChange={(e) => setDreamJobDescription(e.target.value)}
                  placeholder="Describe why this is your dream job, what aspects of it excite you, and what you hope to achieve..."
                  className="w-full min-h-[120px]"
                />
              </div>
              
              <div className="bg-dream-50 p-4 rounded-lg border border-dream-100">
                <h3 className="font-medium text-dream-800 mb-2 flex items-center">
                  <Map className="mr-2 h-5 w-5 text-career-500" />
                  Your Career Journey
                </h3>
                <p className="text-gray-600 text-sm">
                  After submitting your dream job, we'll create a personalized roadmap to help you achieve your career goals. 
                  This will include skill development plans, learning resources, and actionable steps tailored to your current 
                  skills and experience.
                </p>
              </div>
              
              <div className="bg-career-50 p-4 rounded-lg italic text-center">
                <p className="text-career-800 text-sm">{randomQuote}</p>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !dreamJob.trim()}
            className="bg-dream-600 hover:bg-dream-700"
          >
            {isSubmitting ? "Creating Your Roadmap..." : "Create My Roadmap"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DreamJobForm;
