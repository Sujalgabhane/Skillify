import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import { Button } from '@/components/ui/button';
import { FileUp, Award, Route, MessageSquare, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Build Your Path to Success</h2>
              <p className="mt-4 text-xl text-gray-600">
                Transform your career aspirations into a concrete plan with our comprehensive toolkit
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<FileUp size={24} />}
                title="CV Analysis"
                description="Upload your CV and we'll extract your skills, experience, and qualifications automatically."
                linkTo="/upload-cv"
                linkText="Upload CV"
              />
              
              <FeatureCard 
                icon={<Award size={24} />}
                title="Dream Job Blueprint"
                description="Define your dream job and we'll create a personalized roadmap to help you achieve it."
                linkTo="/dream-job"
                linkText="Set Goals"
              />
              
              <FeatureCard 
                icon={<Route size={24} />}
                title="Custom Roadmap"
                description="Follow a step-by-step plan with milestones and resources tailored to your career goals."
                linkTo="/roadmap"
                linkText="View Roadmap"
              />
              
              <FeatureCard 
                icon={<MessageSquare size={24} />}
                title="AI Career Assistant"
                description="Get guidance, answer questions, and receive personalized advice from our AI assistant."
                linkTo="/chatbot"
                linkText="Chat Now"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-dream-600 to-career-600 rounded-xl overflow-hidden shadow-xl">
              <div className="px-6 py-12 sm:px-12 sm:py-16 text-center sm:text-left">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="md:max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                      <span className="block">Ready to ace your interviews?</span>
                    </h2>
                    <p className="mt-3 text-lg text-dream-100 sm:mt-4">
                      Practice with our AI-powered mock interview system and knowledge tests to build confidence and improve your chances of landing your dream job.
                    </p>
                  </div>
                  <div className="mt-8 md:mt-0 md:ml-8">
                    <Link to="/interview">
                      <Button className="px-8 py-3 bg-white text-dream-600 hover:bg-dream-50 text-lg font-medium rounded-md shadow-md">
                        <Video className="mr-2" />
                        Start Mock Interview
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600">
                A simple four-step process to transform your career prospects
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline connector */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gray-200"></div>
              
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                <TimelineStep 
                  number="1"
                  title="Upload Your CV"
                  description="Upload your CV to our platform. Our system will extract your skills, education, and work experience automatically."
                />
                
                <TimelineStep 
                  number="2"
                  title="Define Your Dream Job"
                  description="Tell us about your dream job and career aspirations. This helps us understand your goals and create a personalized plan."
                />
                
                <TimelineStep 
                  number="3"
                  title="Follow Your Roadmap"
                  description="Access your personalized roadmap with step-by-step guidance, resources, and activities to build the skills you need."
                />
                
                <TimelineStep 
                  number="4"
                  title="Practice and Prepare"
                  description="Use our mock interviews, AI assistant, and knowledge tests to prepare for job applications and interviews."
                />
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/upload-cv">
                <Button className="px-8 py-6 bg-dream-600 hover:bg-dream-700 text-lg">
                  Start Your Journey Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">
                Skill<span className="text-dream-400">ify</span>
              </h2>
              <p className="mt-2 text-gray-300">Your path to professional growth.</p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Features</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/upload-cv" className="text-gray-300 hover:text-white">CV Upload</Link></li>
                  <li><Link to="/dream-job" className="text-gray-300 hover:text-white">Goal Setting</Link></li>
                  <li><Link to="/roadmap" className="text-gray-300 hover:text-white">Career Roadmap</Link></li>
                  <li><Link to="/schedule" className="text-gray-300 hover:text-white">Schedule Generator</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/chatbot" className="text-gray-300 hover:text-white">AI Assistant</Link></li>
                  <li><Link to="/interview" className="text-gray-300 hover:text-white">Mock Interviews</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Skillify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  linkTo, 
  linkText 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  linkTo: string;
  linkText: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-dream-100 text-dream-600 mb-5 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-5">{description}</p>
      <div className="text-center">
        <Link to={linkTo}>
          <Button variant="outline" className="border-dream-200 text-dream-700 hover:bg-dream-50">
            {linkText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

const TimelineStep = ({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="relative">
      {/* Circle connector for the timeline */}
      <div className="hidden md:block absolute left-1/2 top-0 -ml-5 h-10 w-10 rounded-full bg-dream-100 border-4 border-dream-600 z-10"></div>
      
      <div className="relative md:ml-0 pl-10 md:pl-0 pb-10">
        <div className="md:text-center">
          <div className="bg-dream-600 text-white h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mb-4 md:mx-auto">
            {number}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
