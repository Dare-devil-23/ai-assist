"use client";
import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto flex flex-col px-4 py-3 relative">
      {children}
    </main>
  );
}
