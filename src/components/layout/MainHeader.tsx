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
    <header className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 h-16 shadow-sm rounded-b-lg">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-500 text-white shadow-sm">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <h1 className="text-base font-medium tracking-tight transition-colors">
            <Link href="/" className="hover:text-blue-600">AI Tutor</Link>
          </h1>
          <div className="hidden md:flex items-center text-sm text-slate-500 space-x-1">
            <span>/</span>
            <span className="rounded px-1.5 py-0.5 cursor-pointer hover:bg-slate-100">Introduction to AI</span>
            <span>/</span>
            <span className="rounded px-1.5 py-0.5 cursor-pointer hover:bg-slate-100">What is AI?</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1.5">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-slate-600 border-slate-200 bg-white hover:bg-slate-50 focus:bg-slate-50 h-8 px-2 text-xs hidden md:flex"
        >
          <Users className="h-3.5 w-3.5 mr-1.5" />
          Share
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-slate-600 border-slate-200 bg-white hover:bg-slate-50 focus:bg-slate-50 h-8 px-2 text-xs hidden md:flex"
        >
          <Presentation className="h-3.5 w-3.5 mr-1.5" />
          Present
        </Button>
        
        <div className="h-6 mx-1 border-r border-slate-200 hidden md:block"></div>
        
        <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 rounded-lg h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 rounded-lg h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center h-8 border border-slate-200 rounded-lg ml-1 overflow-hidden">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
} 