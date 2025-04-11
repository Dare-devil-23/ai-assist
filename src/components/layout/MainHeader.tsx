"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BrainCircuit, Bell, Settings, 
  MessageSquare, Users, Presentation
} from "lucide-react";

interface HeaderProps {
  toggleTranscript: () => void;
}

export function MainHeader({ toggleTranscript }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BrainCircuit className="h-5 w-5" />
          </div>
          
          <div>
            <h1 className="font-medium text-foreground">AI Assistant</h1>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>One Tutor all you need</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1.5">
          {/* <Button 
            variant="outline" 
            size="sm" 
            className="text-foreground border-border bg-background hover:bg-secondary focus:bg-secondary h-8 px-2 text-xs hidden md:flex"
          >
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Share
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-foreground border-border bg-background hover:bg-secondary focus:bg-secondary h-8 px-2 text-xs hidden md:flex"
          >
            <Presentation className="h-3.5 w-3.5 mr-1.5" />
            Present
          </Button>
          
          <div className="h-6 mx-1 border-r border-border hidden md:block"></div> */}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-secondary focus:bg-secondary rounded-lg h-8 w-8"
            onClick={toggleTranscript}
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary focus:bg-secondary rounded-lg h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center h-8 rounded-lg ml-1 overflow-hidden">
            <Avatar className="w-7 h-7 border border-border">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <AvatarFallback className="bg-primary/10 text-primary">AJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}