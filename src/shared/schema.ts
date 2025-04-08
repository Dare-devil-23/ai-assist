export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  topicId?: number;
  chapterId?: number;
}

export interface Topic {
  id: number;
  title: string;
  description?: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  topicId: number;
} 