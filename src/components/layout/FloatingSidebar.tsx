"use client";

import { ReactNode, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";

interface FloatingSidebarProps {
  position: "left" | "right";
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export function FloatingSidebar({ position, isOpen, onToggle, children }: FloatingSidebarProps) {
  const isMobile = useIsMobile();
  
  // Calculate width styles based on position and state
  const getPositionStyles = () => {
    const baseClasses = "fixed top-20 bottom-3 z-20 transition-all duration-300 ease-in-out flex flex-col bg-white border-slate-200 rounded-lg shadow-lg";
    const widthClass = isOpen ? "w-64" : "w-14";
    
    if (position === "left") {
      return cn(
        baseClasses,
        "left-3",
        isOpen ? "border-r" : "border",
        widthClass,
        "hover:shadow-xl"
      );
    } else {
      return cn(
        baseClasses,
        "right-3",
        isOpen ? "border-l" : "border",
        widthClass,
        "hover:shadow-xl"
      );
    }
  };
  
  // Render toggle button
  const renderToggleButton = () => {
    const toggleIcon = position === "left" 
      ? (isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)
      : (isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />);
    
    const buttonClass = cn(
      "absolute top-2 bg-white rounded-full p-1 shadow-sm border border-slate-100 z-50",
      position === "left" ? "-right-3" : "-left-3"
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
  
  return (
    <>
      {renderOverlay()}
      <aside className={getPositionStyles()}>
        {renderToggleButton()}
        
        {position === "left" ? (
          isOpen ? (
            <Sidebar isOpen={isOpen} onClose={onToggle} />
          ) : (
            <div className="flex flex-col items-center p-2 space-y-3 mt-3">
              {/* Collapsed left sidebar with icons only */}
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          )
        ) : (
          // Right sidebar
          isOpen ? (
            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-slate-700">Session Info</h3>
                  
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-slate-600 mb-2">Current Topic</h4>
                    <div className="text-sm text-slate-800">What is Artificial Intelligence?</div>
                    <div className="mt-1 flex items-center text-xs text-slate-500">
                      <span>Introduction to AI</span>
                      <span className="mx-1">•</span>
                      <span>Chapter 1</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-600">Learning Progress</h4>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Chapter 1 of 3</span>
                      <span>35% Complete</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 my-4 pt-4">
                    <h4 className="text-xs font-medium text-slate-600 mb-2">Voice Controls</h4>
                    <div className="flex flex-col space-y-2">
                      <button className="w-full flex items-center justify-between p-2 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                        <span className="text-sm">Enable Microphone</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
                        <span className="text-sm">Speak Slower</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          ) : (
            // Collapsed right sidebar with minimal icons
            <div className="flex flex-col items-center p-2 space-y-3 mt-3">
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )
        )}
      </aside>
    </>
  );
}