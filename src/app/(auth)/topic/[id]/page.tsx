"use client";

import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { MainContent } from "@/components/layout/MainContent";

// Dummy data for topics
const dummyTopics = {
  1: { id: 1, title: "What is Artificial Intelligence?", chapterId: 1 },
  2: { id: 2, title: "History of AI", chapterId: 1 },
  3: { id: 3, title: "AI Applications", chapterId: 1 },
  4: { id: 4, title: "Supervised Learning", chapterId: 2 },
  5: { id: 5, title: "Unsupervised Learning", chapterId: 2 },
  6: { id: 6, title: "Reinforcement Learning", chapterId: 2 },
  7: { id: 7, title: "Neural Networks", chapterId: 3 },
  8: { id: 8, title: "Convolutional Networks", chapterId: 3 },
  9: { id: 9, title: "Recurrent Networks", chapterId: 3 }
};

// Dummy data for chapters
const dummyChapters = {
  1: { id: 1, title: "Introduction to AI" },
  2: { id: 2, title: "Machine Learning Basics" },
  3: { id: 3, title: "Deep Learning" }
};

export default function TopicPage({ params }: { params: { id: string } }) {
  const topicId = parseInt(params.id, 10);
  const topic = dummyTopics[topicId as keyof typeof dummyTopics];
  const chapter = topic ? dummyChapters[topic.chapterId as keyof typeof dummyChapters] : null;
  
  return (
    <MainContent>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <CanvasContainer 
            topicId={topicId} 
          />
        </div>
      </main>
    </MainContent>
  );
} 