"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export function RightSidebar({ isOpen, onClose, activeTab = "session", onTabChange }: RightSidebarProps) {
  const sidebarClasses = cn(
    "w-80 rounded-xl bg-background overflow-y-auto transition-all duration-300 ease-in-out transform",
    isOpen ? 'translate-x-0 inset-y-0 right-1 mt-[70px] md:mt-0 mb-[5px]' : 'translate-x-full',
    'lg:static fixed z-20 pt-5 notion-sidebar'
  );

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className={sidebarClasses}>
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="px-4 mb-4 flex items-center justify-between">
          <TabsList className="bg-secondary/40 px-2">
            <TabsTrigger value="session" className="text-xs px-3 py-1.5 data-[state=active]:bg-background">Session</TabsTrigger>
            <TabsTrigger value="transcript" className="text-xs px-3 py-1.5 data-[state=active]:bg-background">Transcript</TabsTrigger>
          </TabsList>
          {/* <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button> */}
        </div>
        
        <TabsContent value="session" className="px-4 mt-0">
          <div className="space-y-4">
            <div className="bg-secondary/30 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src="/ai-avatar.png" alt="AI" />
                  <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    I'm your personal AI tutor. Ask me anything about this topic and I'll help explain concepts and provide examples.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Current Session</h3>
              <div className="space-y-2">
                <div className="bg-secondary/20 border border-border rounded-lg p-3">
                  <h4 className="text-xs font-medium">What is Artificial Intelligence?</h4>
                  <p className="text-xs text-muted-foreground mt-1">Introduction to the basic concepts of AI and its applications.</p>
                  <div className="flex items-center mt-2">
                    <span className="text-[10px] text-muted-foreground bg-secondary/40 px-2 py-0.5 rounded-full">15 min</span>
                  </div>
                </div>
                
                <div className="bg-secondary/20 border border-border rounded-lg p-3">
                  <h4 className="text-xs font-medium">Machine Learning Basics</h4>
                  <p className="text-xs text-muted-foreground mt-1">Understanding how machines learn from data.</p>
                  <div className="flex items-center mt-2">
                    <span className="text-[10px] text-muted-foreground bg-secondary/40 px-2 py-0.5 rounded-full">20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transcript" className="px-4 mt-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Conversation History</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarFallback className="text-[10px] bg-secondary">You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs">Can you explain what artificial intelligence is?</p>
                    <span className="text-[10px] text-muted-foreground">10:30 AM</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">AI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs">Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect.</p>
                    <span className="text-[10px] text-muted-foreground">10:31 AM</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarFallback className="text-[10px] bg-secondary">You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs">What are the different types of AI?</p>
                    <span className="text-[10px] text-muted-foreground">10:32 AM</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">AI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs">There are several types of AI: Narrow/Weak AI (designed for specific tasks), General/Strong AI (human-level intelligence across tasks), and Superintelligent AI (surpasses human intelligence).</p>
                    <span className="text-[10px] text-muted-foreground">10:33 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}