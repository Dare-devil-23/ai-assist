"use client";

import { useState, useEffect } from "react";
import { MainHeader } from "./MainHeader";
import { FloatingSidebar } from "./FloatingSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Close sidebars on mobile by default
    if (isMobile) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    } else {
      // On desktop, open left sidebar by default
      setLeftSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleTranscript = () => {
    setTranscriptOpen(!transcriptOpen);
    if (!rightSidebarOpen && !transcriptOpen) {
      setRightSidebarOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MainHeader toggleTranscript={toggleTranscript} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative pt-2 px-2 pb-4">
        {children}
        
        <FloatingSidebar
          position="left"
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        />
        
        <FloatingSidebar
          position="right"
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </main>
    </div>
  );
}