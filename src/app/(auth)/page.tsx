"use client";
import { CanvasPlaceholder } from "@/components/canvas/CanvasPlaceholder";
import { useEffect } from "react";
import { checkAuthAndRedirect } from "@/services/auth";

export default function Home() {

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  return (
    <div className="flex h-screen bg-secondary/40">
      <CanvasPlaceholder />
    </div>
  );
}
