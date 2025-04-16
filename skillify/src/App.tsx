
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import CVUploader from "./components/cv/CVUploader";
import DreamJobForm from "./components/goals/DreamJobForm";
import Roadmap from "./components/roadmap/Roadmap";
import ScheduleGenerator from "./components/schedule/ScheduleGenerator";
import Chatbot from "./components/chatbot/Chatbot";
import MockInterview from "./components/interview/MockInterview";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Auth from "./pages/Auth";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <UserProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-cv" element={<CVUploader />} />
              <Route path="/dream-job" element={<DreamJobForm />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/schedule" element={<ScheduleGenerator />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/interview" element={<MockInterview />} />
            </Route>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
