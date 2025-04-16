
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Video, BookOpen, CheckSquare, Mic, MicOff, ThumbsUp, Pencil, Book, User, Award } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Question = {
  id: string;
  question: string;
  category: string;
  tips?: string;
};

type TestQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState('interview');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewCompleted, setIsInterviewCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  // For tests
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  
  const { toast } = useToast();
  const { user } = useUser();
  const notesRef = useRef<HTMLTextAreaElement>(null);
  
  const dreamJob = user?.dreamJob || 'your dream job';
  
  const interviewCategories = [
    { id: 'general', name: 'General' },
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'technical', name: 'Technical' },
    { id: 'situational', name: 'Situational' }
  ];
  
  const interviewQuestions: Record<string, Question[]> = {
    general: [
      { id: 'g1', question: 'Tell me about yourself.', category: 'general', tips: 'Keep it professional and relevant. Highlight experiences that relate to the job.' },
      { id: 'g2', question: 'Why do you want to work in this field?', category: 'general', tips: 'Show genuine interest and connect it to your skills and values.' },
      { id: 'g3', question: 'What are your greatest strengths?', category: 'general', tips: 'Choose strengths relevant to the position and provide examples.' },
      { id: 'g4', question: 'What is your biggest weakness?', category: 'general', tips: 'Be honest but strategic. Mention steps you\'re taking to improve.' },
      { id: 'g5', question: 'Where do you see yourself in five years?', category: 'general', tips: 'Show ambition while being realistic. Connect your goals to the position.' }
    ],
    behavioral: [
      { id: 'b1', question: 'Tell me about a time you faced a challenge at work and how you overcame it.', category: 'behavioral', tips: 'Use the STAR method: Situation, Task, Action, Result.' },
      { id: 'b2', question: 'Describe a situation where you had to work with a difficult colleague or client.', category: 'behavioral', tips: 'Focus on how you navigated the situation professionally.' },
      { id: 'b3', question: 'Give an example of a goal you reached and how you achieved it.', category: 'behavioral', tips: 'Highlight your planning, execution, and results.' },
      { id: 'b4', question: 'Tell me about a time you made a mistake and how you handled it.', category: 'behavioral', tips: 'Show accountability and what you learned from the experience.' },
      { id: 'b5', question: 'Describe a situation where you had to make a difficult decision.', category: 'behavioral', tips: 'Explain your decision-making process and the outcome.' }
    ],
    technical: [
      { id: 't1', question: `What specific technical skills do you bring to the role of ${dreamJob}?`, category: 'technical', tips: 'Be specific about your technical capabilities and how they apply to the role.' },
      { id: 't2', question: 'How do you stay updated with the latest developments in your field?', category: 'technical', tips: 'Mention specific resources, communities, or practices you use.' },
      { id: 't3', question: 'Explain a complex technical concept in simple terms.', category: 'technical', tips: 'Demonstrate your communication skills and technical knowledge.' },
      { id: 't4', question: 'Describe a technical project you worked on that you\'re proud of.', category: 'technical', tips: 'Highlight your role, the technologies used, and the outcomes achieved.' },
      { id: 't5', question: 'How do you approach troubleshooting technical problems?', category: 'technical', tips: 'Outline your systematic approach to problem-solving.' }
    ],
    situational: [
      { id: 's1', question: 'How would you handle a situation where you\'re given multiple urgent tasks with the same deadline?', category: 'situational', tips: 'Demonstrate your prioritization and time management skills.' },
      { id: 's2', question: 'What would you do if you discovered a colleague was violating company policy?', category: 'situational', tips: 'Show your integrity and approach to sensitive situations.' },
      { id: 's3', question: 'How would you handle receiving negative feedback from your manager?', category: 'situational', tips: 'Show your growth mindset and ability to accept constructive criticism.' },
      { id: 's4', question: 'What would you do if a project was falling behind schedule?', category: 'situational', tips: 'Highlight your problem-solving and communication skills.' },
      { id: 's5', question: 'How would you approach a task you\'ve never done before?', category: 'situational', tips: 'Demonstrate your learning agility and resourcefulness.' }
    ]
  };
  
  const testQuestions: TestQuestion[] = [
    {
      id: 'q1',
      question: 'Which of the following is the best approach when answering the "Tell me about yourself" question?',
      options: [
        'Share your entire life story in chronological order',
        'Focus on relevant professional experiences and skills',
        'Only talk about your educational background',
        'Keep it brief by just stating your name and current role'
      ],
      correctAnswer: 1,
      explanation: 'It\'s best to focus on relevant professional experiences and skills that relate to the position you\'re applying for, keeping your answer concise and job-focused.'
    },
    {
      id: 'q2',
      question: 'When describing a weakness in an interview, what is the recommended approach?',
      options: [
        'Deny having any weaknesses',
        'Describe a critical weakness that would disqualify you',
        'Mention a strength disguised as a weakness',
        'Discuss a genuine area for improvement and steps you\'re taking to address it'
      ],
      correctAnswer: 3,
      explanation: 'Being honest about a real area for improvement while emphasizing the steps you\'re taking to address it shows self-awareness and a growth mindset.'
    },
    {
      id: 'q3',
      question: 'What is the STAR method used for in interviews?',
      options: [
        'Rating the performance of the interviewer',
        'Structuring answers to behavioral questions',
        'Evaluating the company culture',
        'Determining salary expectations'
      ],
      correctAnswer: 1,
      explanation: 'The STAR method (Situation, Task, Action, Result) is a structured way to answer behavioral interview questions by describing a specific situation, the task required, the action you took, and the result achieved.'
    },
    {
      id: 'q4',
      question: 'How should you prepare for a question about salary expectations?',
      options: [
        'Demand the highest possible salary',
        'Research industry standards and prepare a reasonable range',
        'Refuse to discuss salary until you have an offer',
        'Accept whatever is offered without negotiation'
      ],
      correctAnswer: 1,
      explanation: 'Researching industry standards for your role, location, and experience level allows you to provide a reasonable salary range that values your skills while remaining competitive.'
    },
    {
      id: 'q5',
      question: 'What should you do if you don\'t know the answer to a technical question?',
      options: [
        'Make up an answer to avoid looking unknowledgeable',
        'Admit you don\'t know but explain your problem-solving approach',
        'Change the subject to something you do know',
        'End the interview immediately'
      ],
      correctAnswer: 1,
      explanation: 'It\'s better to honestly admit when you don\'t know something while explaining how you would approach finding the answer, demonstrating your problem-solving skills and integrity.'
    }
  ];
  
  const getCurrentQuestion = (): Question => {
    return interviewQuestions[selectedCategory][currentQuestionIndex];
  };

  const getCurrentTest = (): TestQuestion => {
    return testQuestions[currentTestIndex];
  };
  
  const startInterview = () => {
    setIsInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setIsInterviewCompleted(false);
    setFeedback(null);
    setNotes('');
    
    toast({
      title: "Interview Started",
      description: "Answer the questions as if you were in a real interview.",
    });
  };
  
  const startRecording = () => {
    setIsRecording(true);
    
    toast({
      title: "Recording Started",
      description: "Speak your answer clearly. Click Stop when finished.",
    });
    
    // In a real app, this would start actual audio recording
    // For this mock, we're just toggling the state
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    
    toast({
      title: "Recording Stopped",
      description: "Your answer has been recorded.",
    });
    
    // In a real app, this would stop recording and process the audio
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions[selectedCategory].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsRecording(false);
      setFeedback(null);
      setNotes('');
    } else {
      // End of interview
      setIsInterviewCompleted(true);
      
      toast({
        title: "Interview Completed",
        description: "You've completed all the questions in this category.",
      });
    }
  };
  
  const provideFeedback = () => {
    // In a real app, this would analyze the audio and provide AI feedback
    // For now, we'll use mock feedback
    const feedbackOptions = [
      "Good answer! You provided specific examples and demonstrated your skills effectively.",
      "Your answer was clear, but try to include more specific examples to illustrate your points.",
      "You addressed the question well. Consider using the STAR method to structure your response more effectively.",
      "Good points, but try to be more concise while still providing detailed examples.",
      "Strong response! You connected your experience well to the requirements of the role."
    ];
    
    const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    setFeedback(randomFeedback);
  };
  
  const restartInterview = () => {
    setIsInterviewStarted(false);
    setIsInterviewCompleted(false);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setNotes('');
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setIsInterviewCompleted(false);
    setFeedback(null);
    setNotes('');
    
    if (isInterviewStarted) {
      toast({
        title: "Category Changed",
        description: `Switched to ${category} questions.`,
      });
    }
  };
  
  // Test functions
  const startTest = () => {
    setCurrentTestIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setTestScore(null);
    setTestAnswers([]);
    
    toast({
      title: "Test Started",
      description: "Select the best answer for each question.",
    });
  };
  
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    setTestAnswers([...testAnswers, selectedOption]);
  };
  
  const nextTestQuestion = () => {
    if (currentTestIndex < testQuestions.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Test complete, calculate score
      const correctAnswers = testAnswers.filter(
        (answer, index) => answer === testQuestions[index].correctAnswer
      ).length + (selectedOption === getCurrentTest().correctAnswer ? 1 : 0);
      
      const score = Math.round((correctAnswers / testQuestions.length) * 100);
      setTestScore(score);
      
      toast({
        title: "Test Completed",
        description: `Your score: ${score}%`,
      });
    }
  };
  
  const restartTest = () => {
    startTest();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dream-800">Mock Interviews & Tests</h1>
        <p className="text-gray-500">Practice interviews and test your knowledge to prepare for your dream job</p>
      </header>
      
      <Tabs 
        defaultValue="interview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="interview" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Mock Interviews
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center">
            <CheckSquare className="mr-2 h-4 w-4" />
            Knowledge Tests
          </TabsTrigger>
        </TabsList>
        
        {/* Mock Interview Tab */}
        <TabsContent value="interview" className="space-y-6">
          {!isInterviewStarted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Video className="mr-2 text-dream-600" size={20} />
                  Prepare for Your Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Select Interview Question Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interviewCategories.map(category => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          className={selectedCategory === category.id ? "bg-dream-600 hover:bg-dream-700" : ""}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <BookOpen className="mr-2 text-dream-600" size={18} />
                      How It Works
                    </h3>
                    <ol className="space-y-2 text-gray-600 list-decimal pl-5">
                      <li>Select a category of interview questions</li>
                      <li>Record your spoken answers to practice your delivery</li>
                      <li>Get feedback on your answers</li>
                      <li>Take notes to improve your responses</li>
                      <li>Track your progress over time</li>
                    </ol>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={startInterview}
                      className="bg-dream-600 hover:bg-dream-700"
                      size="lg"
                    >
                      <Video className="mr-2" size={18} />
                      Start Mock Interview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {!isInterviewCompleted ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <User className="mr-2 text-dream-600" size={20} />
                      Question {currentQuestionIndex + 1} of {interviewQuestions[selectedCategory].length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-dream-50 p-4 rounded-lg border border-dream-100">
                        <h3 className="font-medium text-xl mb-2 text-dream-800">
                          {getCurrentQuestion().question}
                        </h3>
                      </div>
                      
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-center space-x-4">
                          {!isRecording ? (
                            <Button
                              onClick={startRecording}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Mic className="mr-2" size={18} />
                              Start Recording
                            </Button>
                          ) : (
                            <Button
                              onClick={stopRecording}
                              variant="destructive"
                            >
                              <MicOff className="mr-2" size={18} />
                              Stop Recording
                            </Button>
                          )}
                        </div>
                        
                        {!isRecording && (
                          <div className="text-center">
                            <Button
                              onClick={provideFeedback}
                              variant="outline"
                              disabled={isRecording}
                            >
                              <ThumbsUp className="mr-2" size={18} />
                              Get Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {feedback && (
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h3 className="font-medium text-lg mb-2 flex items-center text-green-700">
                            <ThumbsUp className="mr-2" size={18} />
                            Feedback
                          </h3>
                          <p className="text-gray-700">{feedback}</p>
                        </div>
                      )}
                      
                      <div>
                        <label className="block font-medium mb-2 flex items-center">
                          <Pencil className="mr-2" size={18} />
                          Your Notes
                        </label>
                        <textarea
                          ref={notesRef}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-3 min-h-[100px]"
                          placeholder="Take notes on your answer and areas for improvement..."
                        ></textarea>
                      </div>
                      
                      {getCurrentQuestion().tips && (
                        <div className="bg-career-50 p-4 rounded-lg border border-career-100">
                          <h3 className="font-medium text-lg mb-1 flex items-center text-career-700">
                            <Book className="mr-2" size={18} />
                            Tips for This Question
                          </h3>
                          <p className="text-gray-700">{getCurrentQuestion().tips}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={restartInterview}>
                      Restart
                    </Button>
                    <Button 
                      onClick={nextQuestion}
                      className="bg-dream-600 hover:bg-dream-700"
                    >
                      Next Question
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Award className="mr-2 text-dream-600" size={20} />
                      Interview Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                        <ThumbsUp className="mx-auto h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold text-green-700 mb-2">Great Job!</h3>
                        <p className="text-gray-700">
                          You've completed the mock interview for the {selectedCategory} category.
                          Regular practice will help you improve your interview skills and confidence.
                        </p>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setActiveTab('test');
                            startTest();
                          }}
                        >
                          <CheckSquare className="mr-2" size={18} />
                          Try Knowledge Test
                        </Button>
                        <Button 
                          onClick={restartInterview}
                          className="bg-dream-600 hover:bg-dream-700"
                        >
                          <Video className="mr-2" size={18} />
                          Start New Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
        
        {/* Knowledge Test Tab */}
        <TabsContent value="test" className="space-y-6">
          {testScore === null ? (
            <Card>
              {currentTestIndex < testQuestions.length ? (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <CheckSquare className="mr-2 text-dream-600" size={20} />
                      Question {currentTestIndex + 1} of {testQuestions.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-dream-50 p-4 rounded-lg border border-dream-100">
                        <h3 className="font-medium text-lg mb-4 text-dream-800">
                          {getCurrentTest().question}
                        </h3>
                        
                        <div className="space-y-3">
                          {getCurrentTest().options.map((option, index) => (
                            <div 
                              key={index}
                              className={`
                                p-3 rounded-lg border cursor-pointer transition-colors
                                ${selectedOption === index 
                                  ? 'border-dream-600 bg-dream-50' 
                                  : 'border-gray-200 hover:border-dream-300 hover:bg-dream-50/50'}
                                ${isAnswerChecked && index === getCurrentTest().correctAnswer
                                  ? 'bg-green-50 border-green-500'
                                  : ''}
                                ${isAnswerChecked && selectedOption === index && index !== getCurrentTest().correctAnswer
                                  ? 'bg-red-50 border-red-500'
                                  : ''}
                              `}
                              onClick={() => !isAnswerChecked && setSelectedOption(index)}
                            >
                              <div className="flex items-start">
                                <div className={`
                                  h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-0.5
                                  ${selectedOption === index ? 'border-dream-600 bg-dream-600 text-white' : 'border-gray-300'}
                                  ${isAnswerChecked && index === getCurrentTest().correctAnswer ? 'border-green-500 bg-green-500 text-white' : ''}
                                  ${isAnswerChecked && selectedOption === index && index !== getCurrentTest().correctAnswer ? 'border-red-500 bg-red-500 text-white' : ''}
                                `}>
                                  <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                                </div>
                                <span className={`
                                  ${isAnswerChecked && index === getCurrentTest().correctAnswer ? 'text-green-700 font-medium' : ''}
                                  ${isAnswerChecked && selectedOption === index && index !== getCurrentTest().correctAnswer ? 'text-red-700 font-medium' : ''}
                                `}>
                                  {option}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {isAnswerChecked && (
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h3 className="font-medium text-lg mb-2 flex items-center text-green-700">
                            <Book className="mr-2" size={18} />
                            Explanation
                          </h3>
                          <p className="text-gray-700">{getCurrentTest().explanation}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={restartTest}>
                      Restart
                    </Button>
                    {!isAnswerChecked ? (
                      <Button 
                        onClick={checkAnswer}
                        className="bg-dream-600 hover:bg-dream-700"
                        disabled={selectedOption === null}
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={nextTestQuestion}
                        className="bg-dream-600 hover:bg-dream-700"
                      >
                        {currentTestIndex < testQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      </Button>
                    )}
                  </CardFooter>
                </>
              ) : (
                <CardContent className="p-6">
                  <div className="text-center p-6">
                    <p>Start a knowledge test to assess your interview skills.</p>
                    <Button 
                      onClick={startTest}
                      className="mt-4 bg-dream-600 hover:bg-dream-700"
                    >
                      <CheckSquare className="mr-2" size={18} />
                      Start Test
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Award className="mr-2 text-dream-600" size={20} />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center border-4 border-dream-600 mb-4">
                    <span className="text-3xl font-bold text-dream-700">{testScore}%</span>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Your Performance</h3>
                    <p className="text-gray-700 mb-4">
                      {testScore >= 80 
                        ? 'Excellent! You have a great understanding of interview best practices.' 
                        : testScore >= 60 
                          ? 'Good job! You have a solid foundation but there\'s room for improvement.' 
                          : 'You\'re on your way! Keep studying interview techniques to improve your score.'}
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Next Steps:</h4>
                      <ul className="text-left text-gray-700 space-y-1">
                        <li>• Review the questions you missed</li>
                        <li>• Practice more mock interviews</li>
                        <li>• Study the explanation for each question</li>
                        <li>• Try the test again to track your improvement</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveTab('interview');
                        startInterview();
                      }}
                    >
                      <Video className="mr-2" size={18} />
                      Try Mock Interview
                    </Button>
                    <Button 
                      onClick={restartTest}
                      className="bg-dream-600 hover:bg-dream-700"
                    >
                      <CheckSquare className="mr-2" size={18} />
                      Retake Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockInterview;
