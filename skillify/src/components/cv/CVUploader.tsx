
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

const CVUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateUserProfile, setCvUploaded } = useUser();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check if file is PDF or DOCX
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    // Simulate processing with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Simulate CV parsing and extraction
    setTimeout(() => {
      // Mock data extracted from CV
      const mockUserData = {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "555-123-4567",
        skills: [
          { name: "JavaScript", level: "advanced" as const },
          { name: "React", level: "intermediate" as const },
          { name: "TypeScript", level: "intermediate" as const },
          { name: "HTML/CSS", level: "advanced" as const },
        ],
        experience: [
          {
            title: "Frontend Developer",
            company: "Tech Solutions Inc.",
            period: "2020-2022",
            description: "Developed responsive web applications using React and TypeScript."
          },
          {
            title: "Web Developer Intern",
            company: "Digital Creations",
            period: "2019-2020",
            description: "Assisted in building websites and implementing UI designs."
          }
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            institution: "University of Technology",
            year: "2019"
          }
        ]
      };
      
      // Update user profile with extracted data
      updateUserProfile(mockUserData);
      setCvUploaded(true);
      
      setIsLoading(false);
      toast({
        title: "CV Uploaded Successfully",
        description: "Your CV has been processed and your profile has been created!",
      });
      
      // Navigate to dream job form
      navigate('/dream-job');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-dream-700">Upload Your CV</CardTitle>
          <CardDescription>
            Upload your CV in PDF or DOCX format to create your profile and get personalized career guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-dream-500 bg-dream-50' : 'border-gray-300'
            } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className={`h-12 w-12 ${file ? 'text-dream-600' : 'text-gray-400'} mb-4`} />
              
              {file ? (
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium mb-1">Drag and drop your CV here</p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                </>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </div>
          </div>
          
          {isLoading && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-dream-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Processing your CV... {uploadProgress}%
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <AlertCircle size={16} className="mr-2" />
              <span>Maximum file size: 5MB. Supported formats: PDF, DOCX.</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleUpload} 
            disabled={!file || isLoading}
            className="bg-dream-600 hover:bg-dream-700"
          >
            {isLoading ? "Processing..." : "Upload CV"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CVUploader;
