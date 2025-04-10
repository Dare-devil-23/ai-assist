"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, X, ChevronDown, ChevronRight, 
  BookOpen, Lightbulb, FileText, GraduationCap, 
  Award, Activity, BookOpenCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const currentPath = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({
    1: true, // Expand first chapter by default
    2: false,
    3: false
  });
  
  // Toggle chapter expansion
  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  const sidebarClasses = `w-64 border-r border-slate-200 rounded-xl bg-[#fbfbfa] overflow-y-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'lg:translate-x-0 translate-x-0 mt-[70px] md:mt-0 mb-[5px] ml-[5px]' : 'lg:translate-x-0 -translate-x-full'} lg:static fixed inset-y-0 left-0 z-10 pt-5 notion-sidebar`;
  
  // Generate chapter icons based on chapter ID
  const getChapterIcon = (id: number) => {
    const icons = [
      <BookOpen className="h-4 w-4" />,
      <GraduationCap className="h-4 w-4" />,
      <Award className="h-4 w-4" />
    ];
    return icons[id % icons.length];
  };
  
  return (
    <aside className={sidebarClasses}>
      <div className="p-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700">Topics</span>
          </div>
          {/* <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-7 w-7 rounded hover:bg-slate-100 text-slate-500"
            onClick={onClose}
          >
            <X className="h-3.5 w-3.5" />
          </Button> */}
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search topics..."
            className="w-full h-8 pl-8 pr-3 text-sm rounded bg-slate-50 border border-slate-100 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
      
      <nav className="px-3 pt-2 pb-4">
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
        
        <div className="mt-4 px-2">
          <button 
            className="w-full p-1.5 rounded-md notion-block text-left text-slate-500 hover:bg-slate-100 hover:text-slate-700 text-sm transition-colors flex items-center"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-1.5">
              <Plus className="h-3.5 w-3.5" />
            </div>
            <span>Add a page</span>
          </button>
        </div>
        
        <div className="mt-8 px-3 pt-4 border-t border-slate-200">
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            <h3 className="font-medium text-slate-700 flex items-center mb-2">
              <Award className="h-4 w-4 mr-1.5 text-amber-500" />
              Progress
            </h3>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="mt-2 text-xs">
              You've completed 9 out of 20 topics
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
} 