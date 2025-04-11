"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, X, ChevronDown, ChevronRight, 
  BookOpen, Lightbulb, FileText, GraduationCap, 
  Award, Activity, BookOpenCheck, Brain, MessageSquare,
  Book, BookOpenText, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Dummy data
const dummyChapters = [
  { id: 1, title: "Introduction to AI" },
  { id: 2, title: "Machine Learning Basics" },
  { id: 3, title: "Deep Learning" }
];

const dummyTopics = {
  1: [
    { id: 1, title: "What is Artificial Intelligence?" },
    { id: 2, title: "History of AI" },
    { id: 3, title: "AI Applications" }
  ],
  2: [
    { id: 4, title: "Supervised Learning" },
    { id: 5, title: "Unsupervised Learning" },
    { id: 6, title: "Reinforcement Learning" }
  ],
  3: [
    { id: 7, title: "Neural Networks" },
    { id: 8, title: "Convolutional Networks" },
    { id: 9, title: "Recurrent Networks" }
  ]
};

function TopicsList({ chapterId, expandedChapters, currentPath }: { 
  chapterId: number; 
  expandedChapters: Record<number, boolean>;
  currentPath: string;
}) {
  const topics = dummyTopics[chapterId as keyof typeof dummyTopics] || [];
  
  if (topics.length === 0) {
    return (
      <div className="ml-10 mt-2 text-sm p-2 text-muted-foreground italic">
        No topics available
      </div>
    );
  }
  
  // Icons for different types of topics
  const topicIcons = [
    <Lightbulb className="h-4 w-4" />,
    <FileText className="h-4 w-4" />,
    <Activity className="h-4 w-4" />,
    <BookOpenCheck className="h-4 w-4" />
  ];
  
  return (
    <div className="ml-6 mt-1 text-sm space-y-0.5 animate-[slide-up_150ms_ease-out]">
      {topics.map((topic, index) => {
        const isActive = currentPath === `/topic/${topic.id}`;
        const iconIndex = topic.id % topicIcons.length;
        
        return (
          <Link 
            key={topic.id} 
            href={`/topic/${topic.id}`}
            className={`group flex items-center p-1.5 rounded notion-block transition-all cursor-text ${isActive 
              ? 'text-primary bg-secondary/60 font-medium' 
              : 'text-foreground hover:bg-secondary/50'}`}
          >
            <div className="w-4 h-4 flex items-center justify-center mr-1.5">
              <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-primary' : 'bg-muted-foreground group-hover:bg-primary/70'}`}></div>
            </div>
            <span className="flex-1 text-sm">{topic.title}</span>
            {topic.id === 2 && (
              <Badge variant="outline" className="ml-2 text-xs bg-secondary text-primary border-border">New</Badge>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) {
  const currentPath = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false
  });
  const [genAIText, setGenAIText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  
  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  const sidebarClasses = `w-80 rounded-xl bg-background overflow-y-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'lg:translate-x-0 translate-x-0 mt-[70px] md:mt-0 mb-[5px] ml-[5px]' : 'lg:translate-x-0 -translate-x-full'} lg:static fixed inset-y-0 left-0 z-10 pt-5 notion-sidebar`;
  
  const getChapterIcon = (id: number) => {
    const icons = [
      <BookOpen className="h-4 w-4" />,
      <GraduationCap className="h-4 w-4" />,
      <Award className="h-4 w-4" />
    ];
    return icons[id % icons.length];
  };

  const handleGenerate = () => {
    // TODO: Implement AI generation
    console.log("Generating content:", genAIText);
    setIsGenerated(true);
  };

  const handleAddToCanvas = () => {
    // TODO: Implement adding generated content to canvas
    console.log("Adding to canvas:", genAIText);
  };
  
  return (
    <aside className={sidebarClasses}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="px-3">
          <TabsList className="bg-secondary/40 px-2">
            <TabsTrigger 
              value="current" 
              className="text-xs px-3 py-1.5 data-[state=active]:bg-background"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
            <TabsTrigger 
              value="genai" 
              className="text-xs px-3 py-1.5 data-[state=active]:bg-background"
            >
              <Brain className="h-4 w-4 mr-2" />
              LMS
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="current" className="p-3">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search topics..."
              className="w-full h-8 pl-8 pr-3 text-sm rounded bg-secondary/50 border border-border focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <nav>
            {dummyChapters.map((chapter) => (
              <div key={chapter.id} className="mb-3">
                <button 
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left notion-block transition-all ${
                    expandedChapters[chapter.id] 
                      ? 'text-primary' 
                      : 'text-foreground hover:bg-secondary/50'
                  }`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="flex items-center">
                    <div className="w-5 flex items-center justify-center">
                      {expandedChapters[chapter.id] ? (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-muted-foreground">
                      {getChapterIcon(chapter.id)}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{chapter.title}</span>
                    </div>
                  </div>
                </button>
                
                {expandedChapters[chapter.id] && (
                  <TopicsList 
                    chapterId={chapter.id} 
                    expandedChapters={expandedChapters} 
                    currentPath={currentPath} 
                  />
                )}
              </div>
            ))}
          </nav>
        </TabsContent>
        
        <TabsContent value="genai" className="p-3">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-foreground">Generate Content with AI</h3>
              <Textarea 
                placeholder="Enter a prompt to generate content..." 
                className="min-h-[100px] text-sm bg-secondary/50 border-border"
                value={genAIText}
                onChange={(e) => setGenAIText(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1"
                onClick={handleGenerate}
              >
                Generate
              </Button>
              
              {isGenerated && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleAddToCanvas}
                >
                  Add to Canvas
                </Button>
              )}
            </div>
            
            {isGenerated && (
              <div className="mt-4 p-3 bg-secondary/50 rounded-md border border-border">
                <h4 className="text-xs font-medium mb-1 text-primary">Generated Content</h4>
                <p className="text-xs text-foreground">
                  Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}