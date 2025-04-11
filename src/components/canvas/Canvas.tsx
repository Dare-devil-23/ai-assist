import React, { useRef, useEffect } from "react";
import { initializePaper } from "@/lib/paperjs";

interface CanvasProps {
  onPaperInstance: (paper: any) => void;
  className?: string;
  currentTool?: string;
  onCanvasClick?: (event: MouseEvent) => void;
}

export function Canvas({ onPaperInstance, className = "", currentTool = "pen", onCanvasClick }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const paperInstanceRef = useRef<any>(null);

  // Update cursor style based on current tool
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      // Set cursor based on selected tool
      switch (currentTool) {
        case 'pen':
          canvas.classList.add('canvas-area', 'cursor-pen');
          break;
        case 'text':
          canvas.classList.add('canvas-area', 'cursor-text');
          break;
        case 'rectangle':
          canvas.classList.add('canvas-area', 'cursor-crosshair');
          break;
        case 'circle':
          canvas.classList.add('canvas-area', 'cursor-crosshair');
          break;
        case 'eraser':
          canvas.classList.add('canvas-area', 'eraser');
          break;
        default:
          canvas.classList.add('canvas-area');
      }

      return () => {
        canvas.classList.remove('canvas-area', 'cursor-pen', 'cursor-text', 'cursor-crosshair', 'eraser');
      };
    }
  }, [currentTool]);

  // Handle canvas click events
  useEffect(() => {
    if (canvasRef.current && onCanvasClick) {
      const canvas = canvasRef.current;
      
      const handleClick = (event: MouseEvent) => {
        onCanvasClick(event);
      };
      
      canvas.addEventListener('click', handleClick);
      
      return () => {
        canvas.removeEventListener('click', handleClick);
      };
    }
  }, [onCanvasClick]);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let checkPaperInterval: NodeJS.Timeout | null = null;

    const initializePaperJS = () => {
      if (canvasRef.current && !paperInstanceRef.current) {
        const paper = initializePaper('paper-canvas');
        if (paper) {
          paperInstanceRef.current = paper;
          // Set initial canvas size
          const { width, height } = containerRef.current!.getBoundingClientRect();
          paper.view.viewSize = new paper.Size(width, height);
          onPaperInstance(paper);
        }
      }
    };

    // Check if script already exists
    const existingScript = document.getElementById('paper-js-script');
    
    if (!existingScript) {
      script = document.createElement('script');
      script.id = 'paper-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.17/paper-full.min.js';
      script.async = true;
      
      script.onload = initializePaperJS;
      document.body.appendChild(script);
    } else if ((window as any).paper) {
      // Script is already loaded
      initializePaperJS();
    } else {
      // Script exists but not loaded yet
      checkPaperInterval = setInterval(() => {
        if ((window as any).paper) {
          clearInterval(checkPaperInterval!);
          initializePaperJS();
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      if (checkPaperInterval) {
        clearInterval(checkPaperInterval);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (paperInstanceRef.current) {
        paperInstanceRef.current = null;
      }
    };
  }, [onPaperInstance]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && paperInstanceRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        paperInstanceRef.current.view.viewSize = new paperInstanceRef.current.Size(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <canvas 
        id="paper-canvas" 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}