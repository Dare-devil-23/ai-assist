"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainHeader } from "./MainHeader";
import { CanvasContainer } from "../canvas/CanvasContainer";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        isOpen={isLeftSidebarOpen} 
        onClose={() => setIsLeftSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainHeader 
          toggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          toggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          toggleTranscript={() => setIsTranscriptOpen(!isTranscriptOpen)}
        />
        
        <main className="flex-1 overflow-hidden p-4">
          <CanvasContainer 
            topicId={1}
            title="What is Artificial Intelligence?"
            chapterTitle="Introduction to AI"
          />
        </main>
      </div>
    </div>
  );
} 