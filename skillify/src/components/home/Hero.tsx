
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileUp, Award, Route } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block mb-2">Your path to your</span>
            <span className="block text-dream-600">dream career</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload your CV, set your career goals, and let us build a personalized roadmap for your professional journey.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
              <Button 
                className="flex items-center justify-center px-8 py-3 bg-dream-600 hover:bg-dream-700 text-white rounded-md w-full"
                onClick={() => navigate('/upload-cv')}
              >
                <FileUp className="mr-2" size={20} />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 card-hover">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-dream-100 text-dream-600 mb-4">
              <FileUp size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your CV</h3>
            <p className="text-gray-500">Upload your CV and we'll extract your skills, experience, and education to jumpstart your career blueprint.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 card-hover">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-career-100 text-career-600 mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Dream Job</h3>
            <p className="text-gray-500">Tell us about your dream job and career aspirations, and we'll help you define achievable milestones.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 card-hover">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-dream-100 text-dream-600 mb-4">
              <Route size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Your Roadmap</h3>
            <p className="text-gray-500">Get a personalized roadmap with actionable steps, resources, and guidance to reach your dream job.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
