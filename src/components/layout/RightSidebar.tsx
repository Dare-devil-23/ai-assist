"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function RightSidebar({ isOpen, onClose, activeTab, onTabChange }: RightSidebarProps) {
  const sidebarClasses = cn(
    "w-80 rounded-xl bg-[#fbfbfa] overflow-y-auto transition-all duration-300 ease-in-out transform",
    isOpen ? 'translate-x-0 inset-y-0 right-1 mt-[70px] md:mt-0 mb-[5px]' : 'translate-x-full',
    'lg:static fixed z-20 pt-5 notion-sidebar'
  );

  return (
    <aside className={sidebarClasses}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="border-b border-slate-100">
          <TabsList className="w-full grid grid-cols-2 h-12 bg-transparent">
            <TabsTrigger 
              value="session" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none border-b-2 data-[state=active]:border-blue-600"
            >
              <Info className="h-4 w-4 mr-2" />
              Session Info
            </TabsTrigger>
            <TabsTrigger 
              value="transcript" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none border-b-2 data-[state=active]:border-blue-600"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="session" className="p-4">
          <div className="space-y-4">
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
          </div>
        </TabsContent>

        <TabsContent value="transcript" className="p-4">
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">AI</span>
              </div>
              <div className="flex-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-slate-800">Hello! I'm your AI learning assistant. How can I help you today?</p>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">2:30 PM</span>
              </div>
            </div>

            {/* Student Message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-xs font-medium text-slate-600">You</span>
              </div>
              <div className="flex-1">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-800">Can you explain what artificial intelligence is?</p>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">2:31 PM</span>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">AI</span>
              </div>
              <div className="flex-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-slate-800">Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It involves creating systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.</p>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">2:32 PM</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
} 