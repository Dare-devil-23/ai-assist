import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrainCircuit, Mic, MicOff, CircleUser, Volume2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AvatarPanelProps {
  name?: string;
  title?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export function AvatarPanel({ 
  name = "Nova", 
  title = "AI Learning Assistant", 
  imageUrl = "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
  isActive = true
}: AvatarPanelProps) {
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
    <div className="fixed bottom-10 right-10 z-50 border border-slate-200 rounded-xl shadow-lg py-4 px-4 border-b border-slate-100 bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <h3 className="font-medium text-slate-900 text-base leading-tight mr-1.5">{name}</h3>
          <Badge variant="outline" className="px-1.5 py-0.5 text-[10px] bg-blue-50 text-blue-600 border-blue-100">
            <Volume2 className="h-2.5 w-2.5 mr-0.5" /> Live Tutor
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className="px-1.5 py-0.5 text-[10px] bg-green-50 text-green-600 border-green-100">
            <Video className="h-2.5 w-2.5 mr-0.5" /> Live
          </Badge>
        </div>
      </div>
      
      {/* Virtual AI Tutor - Video-like interface */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-2 overflow-hidden shadow-inner">
        {/* Simulated video background with subtle animation */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/30 to-primary-100/20 
          ${currentMood === 'thinking' ? 'animate-pulse' : ''}`}>
          {/* Decorative elements that suggest a virtual classroom/studio */}
          <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-primary-100/40 to-primary-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-5 right-5 w-16 h-16 bg-gradient-to-br from-blue-100/30 to-blue-200/20 rounded-full blur-lg"></div>
          
          {/* Random subtle animation based on AI state */}
          {randomActivity > 0.7 && (
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/70 rounded-full animate-ping"></div>
          )}
          
          {randomActivity < 0.3 && (
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary-200/60 rounded-full animate-pulse"></div>
          )}
        </div>
        
        {/* AI Avatar - Center and larger */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative ${currentMood === 'explaining' ? 'animate-bounce-subtle' : ''}`}>
            {/* Soft glow behind avatar when speaking */}
            {isSpeaking && (
              <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary-300/30 to-primary-400/20 animate-pulse"></div>
            )}
            
            <Avatar className={`w-24 h-24 border-2 ${isSpeaking ? 'border-primary-200' : 'border-white'} shadow-md transition-all duration-300`}>
              <AvatarImage src={imageUrl} alt={`${name} Avatar`} className="object-cover" />
              <AvatarFallback>
                <CircleUser className="h-10 w-10 text-primary-300" />
              </AvatarFallback>
            </Avatar>
            
            {/* Active speaking indicator */}
            {isSpeaking && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-full px-2 py-0.5 shadow-sm border border-primary-100">
                <div className="flex items-end space-x-0.5 h-3">
                  <div className="wave-bar wave h-1.5 w-0.5 bg-primary-400 rounded-full"></div>
                  <div className="wave-bar wave h-2 w-0.5 bg-primary-500 rounded-full"></div>
                  <div className="wave-bar wave h-1 w-0.5 bg-primary-400 rounded-full"></div>
                  <div className="wave-bar wave h-2.5 w-0.5 bg-primary-600 rounded-full"></div>
                  <div className="wave-bar wave h-1.5 w-0.5 bg-primary-400 rounded-full"></div>
                </div>
              </div>
            )}
            
            {/* Small live recording indicator */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse"></div>
          </div>
        </div>
        
        {/* "Now explaining..." text overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center">
              <BrainCircuit className="h-3 w-3 text-primary mr-1.5" />
              <span className="font-medium">
                {currentMood === 'explaining' ? 'Now explaining...' : 
                 currentMood === 'thinking' ? 'Processing question...' : 
                 'Ready to help'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-[10px] text-slate-500">AI Learning Assistant</span>
            </div>
          </div>
        </div>
        
        {/* Decorative video controls */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Status bar below video */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-slate-500">
          <div className="flex items-center mr-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            <span>Live session</span>
          </div>
          <span className="text-slate-400">|</span>
          <div className="flex items-center ml-2">
            <span className="text-slate-500">{isSpeaking ? 'Speaking' : 'Listening'}</span>
          </div>
        </div>
        
        {/* Simulated AI control buttons */}
        <div className="flex items-center space-x-1.5">
          <Button 
            size="sm" 
            variant="ghost"
            className="h-6 w-6 p-0 rounded-full text-slate-500 hover:text-primary hover:bg-primary-50"
          >
            <Volume2 className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-6 w-6 p-0 rounded-full text-slate-500 hover:text-primary hover:bg-primary-50"
          >
            <Mic className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
