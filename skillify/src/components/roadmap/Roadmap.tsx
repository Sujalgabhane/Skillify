
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { RoadmapItem } from '@/contexts/UserContext';

const Roadmap = () => {
  const { user, updateRoadmapItem } = useUser();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!user || !user.roadmap) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Roadmap Available</h2>
          <p className="text-gray-500 mb-6">
            You need to set your dream job first to create your personalized roadmap.
          </p>
          <Button className="bg-dream-600 hover:bg-dream-700" onClick={() => window.location.href = '/dream-job'}>
            Define Dream Job
          </Button>
        </div>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const updateStatus = (id: string, status: RoadmapItem['status']) => {
    updateRoadmapItem(id, { status });
  };

  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-dream-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };

  const getStatusClass = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-dream-200 bg-dream-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dream-800">Your Career Roadmap</h1>
        <p className="text-gray-500">Step-by-step plan to reach your dream job as a {user.dreamJob}</p>
      </header>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

        {/* Roadmap items */}
        <div className="space-y-6">
          {user.roadmap.map((item, index) => (
            <Card 
              key={item.id} 
              className={`relative ${getStatusClass(item.status)} border transition-all duration-200`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Timeline marker (for desktop) */}
                  <div className="hidden md:flex h-12 w-12 rounded-full bg-white shadow-sm border border-gray-200 items-center justify-center absolute -left-6 z-10">
                    {getStatusIcon(item.status)}
                  </div>
                  
                  {/* Mobile view status icon */}
                  <div className="md:hidden flex h-10 w-10 rounded-full bg-white shadow-sm border border-gray-200 items-center justify-center mr-4">
                    {getStatusIcon(item.status)}
                  </div>
                  
                  <div className="md:ml-12 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-dream-800">
                          {index + 1}. {item.title}
                        </h3>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock size={14} className="mr-1" />
                          Timeframe: {item.timeframe}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2 sm:mt-0">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value as RoadmapItem['status'])}
                          className="border border-gray-200 rounded p-1 text-sm mr-2"
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleExpand(item.id)}
                        >
                          {expandedItems.includes(item.id) ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="mt-4 bg-white bg-opacity-70 p-4 rounded-md border border-gray-100">
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        
                        {/* Example resources - these would be dynamically generated based on the roadmap item */}
                        <div>
                          <h4 className="font-medium text-dream-700 mb-2">Recommended Resources:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Online course: Introduction to {item.title}</li>
                            <li>Book: The Complete Guide to {item.title}</li>
                            <li>Practice exercise: {item.title} Assessment</li>
                            <li>Community forum: {item.title} Discussion Group</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-dream-50 to-career-50 p-6 rounded-lg border border-dream-100">
        <h2 className="text-xl font-semibold text-dream-800 mb-4">Your Path to Success</h2>
        <p className="text-gray-700 mb-4">
          This roadmap is designed specifically for your journey to becoming a {user.dreamJob}. 
          Follow the steps in order, mark your progress, and keep track of your achievements.
        </p>
        <p className="text-gray-700">
          Remember that career growth is a marathon, not a sprint. Stay consistent, keep learning, 
          and don't hesitate to reach out to our AI assistant if you need guidance along the way.
        </p>
      </div>
    </div>
  );
};

export default Roadmap;
