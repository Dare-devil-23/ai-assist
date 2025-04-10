import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CanvasPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl mx-20">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-medium text-slate-900 mb-3">Welcome to AI Tutorial</h2>
        <p className="text-slate-600 mb-6">
          Select a topic from the sidebar to start learning and drawing. Each topic provides interactive content and a canvas for your notes.
        </p>
        <div className="flex items-center justify-center">
          <a 
            href="https://user-1014105386081.asia-south1.run.app/oauth2/authorization/google"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Start with Introduction to AI
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
} 