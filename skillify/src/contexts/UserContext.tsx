import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type UserSkill = {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
};

type UserExperience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

type UserEducation = {
  degree: string;
  institution: string;
  year: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  skills: UserSkill[];
  experience: UserExperience[];
  education: UserEducation[];
  dreamJob?: string;
  dreamJobDescription?: string;
  roadmap?: RoadmapItem[];
  schedule?: ScheduleItem[];
};

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  timeframe: string;
};

export type ScheduleItem = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
  priority: 'low' | 'medium' | 'high';
};

type UserContextType = {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cvUploaded: boolean;
  setCvUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  dreamJobSet: boolean;
  setDreamJobSet: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addRoadmapItem: (item: RoadmapItem) => void;
  updateRoadmapItem: (id: string, updates: Partial<RoadmapItem>) => void;
  addScheduleItem: (item: ScheduleItem) => void;
  updateScheduleItem: (id: string, updates: Partial<ScheduleItem>) => void;
  deleteScheduleItem: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [dreamJobSet, setDreamJobSet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          setUser(prev => ({
            ...prev,
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata.name || '',
          } as UserProfile));
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        setUser(prev => ({
          ...prev,
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          name: currentSession.user.user_metadata.name || '',
        } as UserProfile));
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return data as UserProfile;
      return { ...prev, ...data };
    });
  };

  const addRoadmapItem = (item: RoadmapItem) => {
    setUser(prev => {
      if (!prev) return null;
      const roadmap = prev.roadmap || [];
      return { ...prev, roadmap: [...roadmap, item] };
    });
  };

  const updateRoadmapItem = (id: string, updates: Partial<RoadmapItem>) => {
    setUser(prev => {
      if (!prev || !prev.roadmap) return prev;
      const updatedRoadmap = prev.roadmap.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      return { ...prev, roadmap: updatedRoadmap };
    });
  };

  const addScheduleItem = (item: ScheduleItem) => {
    setUser(prev => {
      if (!prev) return null;
      const schedule = prev.schedule || [];
      return { ...prev, schedule: [...schedule, item] };
    });
  };

  const updateScheduleItem = (id: string, updates: Partial<ScheduleItem>) => {
    setUser(prev => {
      if (!prev || !prev.schedule) return prev;
      const updatedSchedule = prev.schedule.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      return { ...prev, schedule: updatedSchedule };
    });
  };

  const deleteScheduleItem = (id: string) => {
    setUser(prev => {
      if (!prev || !prev.schedule) return prev;
      const updatedSchedule = prev.schedule.filter(item => item.id !== id);
      return { ...prev, schedule: updatedSchedule };
    });
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        session,
        setSession,
        isLoading, 
        setIsLoading,
        cvUploaded,
        setCvUploaded,
        dreamJobSet,
        setDreamJobSet,
        updateUserProfile,
        addRoadmapItem,
        updateRoadmapItem,
        addScheduleItem,
        updateScheduleItem,
        deleteScheduleItem
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
