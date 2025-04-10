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
      <div className="ml-10 mt-2 text-sm p-2 text-slate-500 italic">
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
              ? 'text-blue-600 bg-blue-50/60 font-medium' 
              : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <div className="w-4 h-4 flex items-center justify-center mr-1.5">
              <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-blue-600' : 'bg-slate-400 group-hover:bg-blue-400'}`}></div>
            </div>
            <span className="flex-1 text-sm">{topic.title}</span>
            {topic.id === 2 && (
              <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-600 border-blue-100">New</Badge>
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
  
  const sidebarClasses = `w-80 rounded-xl bg-[#fbfbfa] overflow-y-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'lg:translate-x-0 translate-x-0 mt-[70px] md:mt-0 mb-[5px] ml-[5px]' : 'lg:translate-x-0 -translate-x-full'} lg:static fixed inset-y-0 left-0 z-10 pt-5 notion-sidebar`;
  
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
        <div className="border-b border-slate-100">
          <TabsList className="w-full grid grid-cols-2 h-12 bg-transparent">
            <TabsTrigger 
              value="current" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none border-b-2 data-[state=active]:border-blue-600"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
            <TabsTrigger 
              value="genai" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none border-b-2 data-[state=active]:border-blue-600"
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
              className="w-full h-8 pl-8 pr-3 text-sm rounded bg-slate-50 border border-slate-100 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          
          <nav>
            {dummyChapters.map((chapter) => (
              <div key={chapter.id} className="mb-3">
                <button 
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left notion-block transition-all ${
                    expandedChapters[chapter.id] 
                      ? 'text-blue-600' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="flex items-center">
                    <div className="w-5 flex items-center justify-center">
                      {expandedChapters[chapter.id] ? (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                      )}
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-slate-600">
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
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                <Book className="h-3 w-3 mr-1" />
                Book
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                <Brain className="h-3 w-3 mr-1" />
                AI Notes
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                <ClipboardList className="h-3 w-3 mr-1" />
                Question Bank
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                <BookOpenText className="h-3 w-3 mr-1" />
                Study Guide
              </Badge>
            </div>
            
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-[120px] text-sm"
              value={genAIText}
              onChange={(e) => setGenAIText(e.target.value)}
            />
            
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={handleGenerate}
              >
                <Brain className="h-4 w-4 mr-2" />
                Generate
              </Button>
              
              {isGenerated && (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleAddToCanvas}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add to Canvas
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
} 