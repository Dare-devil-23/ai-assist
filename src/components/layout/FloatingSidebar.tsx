"use client";

import { ReactNode, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, BookOpen, Brain, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";

interface FloatingSidebarProps {
  position: "left" | "right";
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export function FloatingSidebar({ position, isOpen, onToggle, children }: FloatingSidebarProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(position === "left" ? "current" : "session");

  // Calculate width styles based on position and state
  const getPositionStyles = () => {
    const baseClasses = "fixed bottom-2 h-10 md:border w-10 md:w-auto md:h-auto bg-none md:top-20 md:bottom-3 transition-all duration-300 ease-in-out flex flex-col md:bg-white md:border-slate-200 md:rounded-full md:rounded-lg md:shadow-lg";
    const widthClass = isOpen ? "w-64 z-20" : "w-14 z-10";

    if (position === "left") {
      return cn(
        baseClasses,
        "left-3",
        isOpen ? "md:border-r" : "md:border",
        widthClass,
        "md:hover:shadow-xl"
      );
    } else {
      return cn(
        baseClasses,
        "right-3",
        isOpen ? "md:border-l" : "md:border",
        widthClass,
        "md:hover:shadow-xl"
      );
    }
  };

  // Render toggle button
  const renderToggleButton = () => {
    const toggleIcon = position === "left"
      ? (isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)
      : (isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />);

    const buttonClass = cn(
      "absolute top-1 md:top-2 bg-white rounded-full p-1 shadow-sm border border-slate-100 z-30",
      position === "left" ? isOpen ? "md:-right-3 -right-[70px]" : "md:-right-3 right-5" : isOpen ? "md:-left-3 -left-[70px]" : "md:-left-3 left-5"
    );

    return (
      <button
        className={buttonClass}
        onClick={onToggle}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {toggleIcon}
      </button>
    );
  };

  // Add overlay when sidebar is open on mobile
  const renderOverlay = () => {
    if (isMobile && isOpen) {
      return (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={onToggle}
        />
      );
    }
    return null;
  };

  // Render collapsed icons for left sidebar
  const renderLeftCollapsedIcons = () => (
    <div className="hidden md:flex flex-col items-center p-2 space-y-3 mt-3">
      <button 
        onClick={() => { setActiveTab("current"); onToggle(); }}
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${activeTab === "current" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
      >
        <BookOpen className="h-5 w-5" />
      </button>

      <button 
        onClick={() => { setActiveTab("genai"); onToggle(); }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center ${activeTab === "genai" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
      >
        <Brain className="h-4 w-4" />
      </button>
    </div>
  );

  // Render collapsed icons for right sidebar
  const renderRightCollapsedIcons = () => (
    <div className="hidden md:flex flex-col items-center p-2 space-y-3 mt-3">
      <button 
        onClick={() => { setActiveTab("session"); onToggle(); }}
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${activeTab === "session" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
      >
        <Info className="h-5 w-5" />
      </button>

      <button 
        onClick={() => { setActiveTab("transcript"); onToggle(); }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center ${activeTab === "transcript" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
      >
        <MessageSquare className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <>
      {renderOverlay()}
      <aside className={getPositionStyles()}>
        {renderToggleButton()}

        {position === "left" ? (
          isOpen ? (
            <Sidebar isOpen={isOpen} onClose={onToggle} activeTab={activeTab} onTabChange={setActiveTab} />
          ) : (
            renderLeftCollapsedIcons()
          )
        ) : (
          isOpen ? (
            <RightSidebar isOpen={isOpen} onClose={onToggle} activeTab={activeTab} onTabChange={setActiveTab} />
          ) : (
            renderRightCollapsedIcons()
          )
        )}
      </aside>
    </>
  );
}