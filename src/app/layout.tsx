"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FloatingSidebar } from "@/components/layout/FloatingSidebar";
import { MainHeader } from "@/components/layout/MainHeader";
import { AvatarPanel } from "@/components/layout/AvatarPanel";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsLeftSidebarOpen(false);
    setIsRightSidebarOpen(false);
  }, [pathname]);

  const handleRightSidebarToggle = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
    setIsLeftSidebarOpen(false);
  };

  const handleLeftSidebarToggle = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    setIsRightSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen bg-slate-50">
            <FloatingSidebar
              position="left"
              isOpen={isLeftSidebarOpen}
              onToggle={() => handleLeftSidebarToggle()}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
              <MainHeader
                toggleTranscript={() => setIsTranscriptOpen(!isTranscriptOpen)}
              />
              {children}
            </div>

            <FloatingSidebar
              position="right"
              isOpen={isRightSidebarOpen}
              onToggle={() => handleRightSidebarToggle()}
            />

            <AvatarPanel 
              isLeftSidebarOpen={isLeftSidebarOpen}
              isRightSidebarOpen={isRightSidebarOpen}
            />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}