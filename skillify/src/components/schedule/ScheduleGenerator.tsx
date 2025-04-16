import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, Trash2, Plus, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { ScheduleItem } from '@/contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';

const ScheduleGenerator = () => {
  const { user, addScheduleItem, updateScheduleItem, deleteScheduleItem } = useUser();
  const { toast } = useToast();
  
  const [newItem, setNewItem] = useState<Omit<ScheduleItem, 'id'>>({
    day: '',
    startTime: '',
    endTime: '',
    activity: '',
    priority: 'medium'
  });
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const priorities = [
    { value: 'low' as const, label: 'Low', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium' as const, label: 'Medium', color: 'bg-blue-100 text-blue-700' },
    { value: 'high' as const, label: 'High', color: 'bg-red-100 text-red-700' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddItem = () => {
    if (!newItem.day || !newItem.startTime || !newItem.endTime || !newItem.activity) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new schedule item
    addScheduleItem({
      ...newItem,
      id: uuidv4()
    });
    
    // Reset the form
    setNewItem({
      day: '',
      startTime: '',
      endTime: '',
      activity: '',
      priority: 'medium'
    });
    
    toast({
      title: "Schedule item added",
      description: `Added ${newItem.activity} to your schedule`,
    });
  };
  
  const handleDeleteItem = (id: string) => {
    deleteScheduleItem(id);
    toast({
      title: "Schedule item removed",
      description: "The item has been removed from your schedule",
    });
  };
  
  const getPriorityBadgeClass = (priority: ScheduleItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const generateScheduleTemplate = () => {
    const templates = [
      {
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00',
        activity: 'Study technical skills',
        priority: 'high' as const
      },
      {
        day: 'Monday',
        startTime: '16:00',
        endTime: '17:30',
        activity: 'Practice interview questions',
        priority: 'medium' as const
      },
      {
        day: 'Tuesday',
        startTime: '07:30',
        endTime: '09:00',
        activity: 'Online course: Fundamentals',
        priority: 'high' as const
      },
      {
        day: 'Wednesday',
        startTime: '18:00',
        endTime: '20:00',
        activity: 'Work on portfolio project',
        priority: 'high' as const
      },
      {
        day: 'Thursday',
        startTime: '17:00',
        endTime: '18:30',
        activity: 'Networking: Industry meetup',
        priority: 'medium' as const
      },
      {
        day: 'Friday',
        startTime: '07:00',
        endTime: '08:30',
        activity: 'Review weekly progress',
        priority: 'medium' as const
      },
      {
        day: 'Saturday',
        startTime: '10:00',
        endTime: '12:00',
        activity: 'Read industry publications',
        priority: 'low' as const
      }
    ];
    
    // Add template items to the schedule
    templates.forEach(template => {
      addScheduleItem({
        ...template,
        id: uuidv4()
      });
    });
    
    toast({
      title: "Schedule template generated",
      description: "A sample schedule has been created. You can edit or customize it.",
    });
  };
  
  const scheduleByDay = days.map(day => {
    const dayItems = user?.schedule?.filter(item => item.day === day) || [];
    return {
      day,
      items: dayItems.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      })
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dream-800">Study Schedule Generator</h1>
        <p className="text-gray-500">Create and manage your study schedule to achieve your career goals</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Plus className="mr-2 text-dream-600" size={18} />
                Add Schedule Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    name="day"
                    value={newItem.day}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select a day</option>
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <Input
                      type="time"
                      name="startTime"
                      value={newItem.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <Input
                      type="time"
                      name="endTime"
                      value={newItem.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Activity</label>
                  <Textarea
                    name="activity"
                    value={newItem.activity}
                    onChange={handleInputChange}
                    placeholder="What will you be working on?"
                    className="resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <div className="flex space-x-2">
                    {priorities.map(priority => (
                      <button
                        key={priority.value}
                        type="button"
                        className={`px-3 py-1 rounded-full text-sm ${
                          newItem.priority === priority.value 
                            ? priority.color + ' border-2 border-gray-500' 
                            : priority.color + ' opacity-50'
                        }`}
                        onClick={() => setNewItem(prev => ({ ...prev, priority: priority.value as any }))}
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddItem}
                  className="w-full bg-dream-600 hover:bg-dream-700"
                >
                  Add to Schedule
                </Button>
                
                {(!user?.schedule || user.schedule.length === 0) && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-dream-200 text-dream-700"
                    onClick={generateScheduleTemplate}
                  >
                    <CalendarIcon className="mr-2" size={16} />
                    Generate Sample Schedule
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <Clock className="mr-2 text-dream-600" size={18} />
                Schedule Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-dream-600 mr-2 mt-0.5">•</span>
                  <span>Balance study time with breaks for optimal learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dream-600 mr-2 mt-0.5">•</span>
                  <span>Focus on high-priority tasks during your peak energy hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dream-600 mr-2 mt-0.5">•</span>
                  <span>Schedule regular review sessions to reinforce learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dream-600 mr-2 mt-0.5">•</span>
                  <span>Include time for networking and industry research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dream-600 mr-2 mt-0.5">•</span>
                  <span>Don't overload your schedule - quality over quantity</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 text-dream-600" size={18} />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(!user?.schedule || user.schedule.length === 0) ? (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h2 className="text-lg font-medium mb-2">No Schedule Items Yet</h2>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Add items to your schedule or generate a sample schedule to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {scheduleByDay.map(({ day, items }) => (
                    <div key={day}>
                      {items.length > 0 && (
                        <>
                          <h3 className="font-semibold text-lg border-b pb-2 mb-3">{day}</h3>
                          <div className="space-y-3">
                            {items.map(item => (
                              <div 
                                key={item.id} 
                                className="flex items-start justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <div className="flex items-start">
                                  <div className="flex flex-col mr-4 items-center">
                                    <span className="text-sm font-medium text-gray-700">{item.startTime}</span>
                                    <div className="h-6 border-l border-dashed border-gray-300"></div>
                                    <span className="text-sm font-medium text-gray-700">{item.endTime}</span>
                                  </div>
                                  
                                  <div>
                                    <div className="flex items-center">
                                      <span className="font-medium text-dream-800">{item.activity}</span>
                                      <span 
                                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityBadgeClass(item.priority)}`}
                                      >
                                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {calculateDuration(item.startTime, item.endTime)}
                                    </span>
                                  </div>
                                </div>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function calculateDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  let durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }
  
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
}

export default ScheduleGenerator;
