"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrainCircuit, Mic, MicOff, CircleUser, Volume2, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AvatarPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarPanel({ isOpen, onClose }: AvatarPanelProps) {
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [currentMood, setCurrentMood] = useState<'neutral' | 'thinking' | 'explaining'>('neutral');
  const [randomActivity, setRandomActivity] = useState(0);
  
  // Simulate AI tutor activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Random animation to make AI feel alive
      const moods: ('neutral' | 'thinking' | 'explaining')[] = ['neutral', 'thinking', 'explaining'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setCurrentMood(randomMood);
      
      // Random number for subtle animation variations
      setRandomActivity(Math.random());
      
      // Toggle speaking randomly to simulate explaining
      if (Math.random() > 0.7) {
        setIsSpeaking(prev => !prev);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`fixed bottom-10 right-10 z-50 shadow-lg border border-slate-200 rounded-lg xl:w-[350px] lg:w-[300px] md:w-[280px] sm:w-full border-l border-slate-100 flex flex-col overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/nova-avatar.png" alt="Nova" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Nova</h3>
            <p className="text-sm text-slate-500">AI Learning Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat content will go here */}
      </div>
    </div>
  );
}
