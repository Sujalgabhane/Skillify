
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, User, Cpu, Send, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I\'m your AI career assistant. I can help with career advice, resume tips, interview preparation, and more. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useUser();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const botResponse = generateResponse(input, user?.dreamJob);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dream-800">AI Career Assistant</h1>
        <p className="text-gray-500">Get personalized career advice and guidance</p>
      </header>
      
      <Card className="border-dream-100">
        <CardHeader className="bg-gradient-to-r from-dream-50 to-career-50 border-b border-dream-100">
          <CardTitle className="flex items-center text-xl">
            <Sparkles className="mr-2 text-dream-600" size={20} />
            Career AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[60vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-dream-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === 'user' ? (
                        <>
                          <span className="text-xs opacity-75">You</span>
                          <User className="h-3 w-3 ml-1 opacity-75" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs opacity-75">AI Assistant</span>
                          <Cpu className="h-3 w-3 ml-1 opacity-75" />
                        </>
                      )}
                      <span className="text-xs opacity-75 ml-2">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isTyping || !input.trim()}
                  className="bg-dream-600 hover:bg-dream-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Powered by OpenAI</span>
                <span>Ask about career advice, resume tips, interview preparation, and more</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SuggestionButton
          label="Resume tips"
          onClick={() => {
            setInput("Can you give me tips to improve my resume?");
            handleSendMessage();
          }}
          disabled={isTyping}
        />
        <SuggestionButton
          label="Interview questions"
          onClick={() => {
            setInput("What common interview questions should I prepare for?");
            handleSendMessage();
          }}
          disabled={isTyping}
        />
        <SuggestionButton
          label="Skill development"
          onClick={() => {
            setInput("How can I develop new skills for my career?");
            handleSendMessage();
          }}
          disabled={isTyping}
        />
        <SuggestionButton
          label="Career advice"
          onClick={() => {
            setInput("Give me some general career advancement advice");
            handleSendMessage();
          }}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

const SuggestionButton = ({ 
  label, 
  onClick, 
  disabled 
}: { 
  label: string; 
  onClick: () => void; 
  disabled: boolean;
}) => (
  <Button
    variant="outline"
    className="bg-white border-dream-200 text-dream-700 hover:bg-dream-50"
    onClick={onClick}
    disabled={disabled}
  >
    <MessageSquare className="mr-2 h-4 w-4" />
    {label}
  </Button>
);

// Function to generate AI responses
const generateResponse = (userMessage: string, dreamJob?: string): string => {
  // Convert message to lowercase for easier matching
  const message = userMessage.toLowerCase();
  
  // Resume tips
  if (message.includes('resume') || message.includes('cv')) {
    return `Here are some tips to improve your resume:

1. Tailor your resume to each job application
2. Use action verbs and quantify achievements
3. Keep it concise (1-2 pages)
4. Include relevant skills and keywords
5. Ensure proper formatting and no typos
6. Add a compelling professional summary
7. Include relevant projects and experiences

Would you like specific advice about a particular section of your resume?`;
  }
  
  // Interview preparation
  if (message.includes('interview')) {
    return `Here are some common interview questions to prepare for:

1. "Tell me about yourself"
2. "Why do you want this job?"
3. "What are your strengths and weaknesses?"
4. "Tell me about a challenge you faced and how you overcame it"
5. "Where do you see yourself in 5 years?"
6. "Why should we hire you?"

For technical interviews, also prepare for role-specific questions. Practice your answers out loud and prepare examples from your experience. Is there a specific type of interview you'd like to focus on?`;
  }
  
  // Skill development
  if (message.includes('skill') || message.includes('learn') || message.includes('course')) {
    const jobSpecificAdvice = dreamJob 
      ? `\nFor pursuing a career as a ${dreamJob}, focus on developing these key skills:\n\n1. Technical proficiency in relevant tools and technologies\n2. Problem-solving and analytical thinking\n3. Communication and teamwork abilities\n4. Industry-specific knowledge`
      : '';
      
    return `Here are ways to develop new skills for your career:

1. Online courses (Coursera, Udemy, edX)
2. Industry certifications
3. Books and educational blogs
4. Mentorship and coaching
5. Practice projects
6. Volunteering or freelance work
7. Industry webinars and workshops${jobSpecificAdvice}

Would you like recommendations for specific resources?`;
  }
  
  // Career advancement
  if (message.includes('career') || message.includes('job') || message.includes('advance') || message.includes('grow') || message.includes('advice')) {
    return `Here are some career advancement tips:

1. Set clear, specific career goals
2. Build a strong professional network
3. Find a mentor in your field
4. Continuously update your skills
5. Take initiative and volunteer for projects
6. Request regular feedback
7. Build your personal brand
8. Stay current with industry trends

Remember that career growth takes time. Focus on consistent improvement and building valuable relationships. Is there a specific area you'd like more advice on?`;
  }
  
  // Networking
  if (message.includes('network') || message.includes('connect')) {
    return `Here are effective networking strategies:

1. Attend industry events and conferences
2. Join professional associations
3. Engage on LinkedIn and other professional platforms
4. Participate in online communities and forums
5. Schedule informational interviews
6. Follow up with new connections
7. Provide value before asking for favors

Networking is about building genuine relationships, not just collecting contacts. Would you like specific advice about networking in your industry?`;
  }
  
  // Default response
  return `Thank you for your message. I'm here to help with any career-related questions you have, including:

- Resume and CV optimization
- Interview preparation
- Skill development planning
- Career advancement strategies
- Job search tactics
- Networking advice

Feel free to ask something specific, and I'll provide tailored guidance based on your needs.`;
};

export default Chatbot;
