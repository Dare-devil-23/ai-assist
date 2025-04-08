import { useRef, useEffect, useState } from "react";
import { CanvasToolbar } from "./CanvasToolbar";
import { initializePaper } from "@/lib/paperjs";

interface CanvasContainerProps {
  topicId: number;
  title?: string;
  chapterTitle?: string;
}

export function CanvasContainer({ topicId, title, chapterTitle }: CanvasContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTool, setCurrentTool] = useState<string>("pen");
  const [currentColor, setCurrentColor] = useState<string>("#4F46E5");
  const [paperInstance, setPaperInstance] = useState<any>(null);
  const [textInput, setTextInput] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: ''
  });
  
  // Initialize Paper.js
  useEffect(() => {
    const initializePaperJS = () => {
      if (canvasRef.current) {
        const paper = initializePaper('paper-canvas');
        if (paper) {
          setPaperInstance(paper);
          // Set initial canvas size
          const { width, height } = containerRef.current!.getBoundingClientRect();
          paper.view.viewSize = new paper.Size(width, height);
        }
      }
    };

    // Check if script already exists
    const existingScript = document.getElementById('paper-js-script');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'paper-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.17/paper-full.min.js';
      script.async = true;
      
      script.onload = initializePaperJS;
      document.body.appendChild(script);
      
      return () => {
        if (document.getElementById('paper-js-script')) {
          document.body.removeChild(script);
        }
      };
    } else if ((window as any).paper) {
      // Script is already loaded
      initializePaperJS();
    } else {
      // Script exists but not loaded yet
      const checkPaper = setInterval(() => {
        if ((window as any).paper) {
          clearInterval(checkPaper);
          initializePaperJS();
        }
      }, 100);

      return () => clearInterval(checkPaper);
    }
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && paperInstance) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        paperInstance.view.viewSize = new paperInstance.Size(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size
    return () => window.removeEventListener('resize', handleResize);
  }, [paperInstance]);
  
  // Handle tool change
  useEffect(() => {
    if (!paperInstance) return;
    
    // Deactivate current tool
    if (paperInstance.tool) {
      paperInstance.tool.remove();
    }
    
    // Activate the selected tool
    switch (currentTool) {
      case "pen":
        paperInstance.tool = new paperInstance.Tool();
        let path: any = null;
        
        paperInstance.tool.onMouseDown = (event: any) => {
          path = new paperInstance.Path();
          path.strokeColor = currentColor;
          path.strokeWidth = 2;
          path.strokeCap = 'round';
          path.strokeJoin = 'round';
          path.add(event.point);
        };
        
        paperInstance.tool.onMouseDrag = (event: any) => {
          if (path) {
            path.add(event.point);
            if (path.segments.length > 3) {
              path.smooth({ type: 'catmull-rom', factor: 0.5 });
            }
          }
        };
        
        paperInstance.tool.onMouseUp = () => {
          if (path) {
            path.simplify(2.5);
          }
        };
        break;
      case "text":
        paperInstance.tool = new paperInstance.Tool();
        paperInstance.tool.onMouseDown = (event: any) => {
          setTextInput({
            visible: true,
            x: event.point.x,
            y: event.point.y,
            text: ''
          });
        };
        break;
      case "shape":
        paperInstance.tool = new paperInstance.Tool();
        let rectangle: any = null;
        let startPoint: any = null;
        
        paperInstance.tool.onMouseDown = (event: any) => {
          startPoint = event.point;
          rectangle = new paperInstance.Path.Rectangle({
            from: startPoint,
            to: startPoint,
            strokeColor: currentColor,
            strokeWidth: 2,
            fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
          });
        };
        
        paperInstance.tool.onMouseDrag = (event: any) => {
          if (rectangle) {
            rectangle.remove();
            rectangle = new paperInstance.Path.Rectangle({
              from: startPoint,
              to: event.point,
              strokeColor: currentColor,
              strokeWidth: 2,
              fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
            });
          }
        };
        
        paperInstance.tool.onMouseUp = () => {
          if (rectangle) {
            rectangle = null;
          }
        };
        break;
      case "circle":
        paperInstance.tool = new paperInstance.Tool();
        let circle: any = null;
        let center: any = null;
        
        paperInstance.tool.onMouseDown = (event: any) => {
          center = event.point;
          circle = new paperInstance.Path.Circle({
            center: center,
            radius: 1,
            strokeColor: currentColor,
            strokeWidth: 2,
            fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
          });
        };
        
        paperInstance.tool.onMouseDrag = (event: any) => {
          if (circle) {
            const radius = center.getDistance(event.point);
            circle.remove();
            circle = new paperInstance.Path.Circle({
              center: center,
              radius: radius,
              strokeColor: currentColor,
              strokeWidth: 2,
              fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
            });
          }
        };
        
        paperInstance.tool.onMouseUp = () => {
          if (circle) {
            circle = null;
          }
        };
        break;
      case "eraser":
        paperInstance.tool = new paperInstance.Tool();
        let eraserPath: any = null;
        
        paperInstance.tool.onMouseDown = (event: any) => {
          // Create visual feedback for eraser
          eraserPath = new paperInstance.Path.Circle({
            center: event.point,
            radius: 10,
            fillColor: new paperInstance.Color(1, 1, 1, 0.5),
            strokeColor: new paperInstance.Color(0, 0, 0, 0.3),
            strokeWidth: 1
          });
          
          // Find items at this point and remove them
          const hitResult = paperInstance.project.hitTest(event.point, {
            fill: true,
            stroke: true,
            tolerance: 10
          });
          
          if (hitResult && hitResult.item) {
            hitResult.item.remove();
          }
        };
        
        paperInstance.tool.onMouseDrag = (event: any) => {
          // Move the visual eraser
          if (eraserPath) {
            eraserPath.position = event.point;
          }
          
          // Find items at this point and remove them
          const hitResult = paperInstance.project.hitTest(event.point, {
            fill: true,
            stroke: true,
            tolerance: 10
          });
          
          if (hitResult && hitResult.item && hitResult.item !== eraserPath) {
            hitResult.item.remove();
          }
        };
        
        paperInstance.tool.onMouseUp = () => {
          // Remove the visual eraser
          if (eraserPath) {
            eraserPath.remove();
            eraserPath = null;
          }
        };
        break;
    }
    
    // Cleanup function
    return () => {
      if (paperInstance.tool) {
        paperInstance.tool.remove();
      }
    };
  }, [paperInstance, currentTool, currentColor]);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden mx-20 rounded-xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="cursor-text">
          <h2 className="text-3xl font-medium text-slate-900 mb-0.5">{title || "AI Tutorial"}</h2>
          <div className="flex items-center">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mr-2 cursor-pointer hover:bg-blue-100 transition-colors">
              {chapterTitle || "Introduction to AI"}
            </span>
            <span className="text-xs text-slate-400">Just now</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-white border border-slate-200 rounded-xl shadow-lg" ref={containerRef}>
        <canvas id="paper-canvas" ref={canvasRef} 
          className={`absolute inset-0 w-full h-full canvas-area ${
            currentTool === "eraser" ? "eraser" : 
            currentTool === "pen" ? "cursor-pen" : 
            currentTool === "text" ? "cursor-text" : 
            (currentTool === "shape" || currentTool === "circle") ? "cursor-crosshair" : 
            currentTool === "ai" ? "cursor-help" : ""
          }`}>
        </canvas>
        
        {/* Text input overlay */}
        {textInput.visible && (
          <div 
            className="absolute z-50"
            style={{
              left: `${textInput.x}px`,
              top: `${textInput.y}px`,
              transform: 'translateY(-100%)'
            }}
          >
            <input
              type="text"
              value={textInput.text}
              onChange={(e) => setTextInput(prev => ({ ...prev, text: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (textInput.text.trim()) {
                    const text = new paperInstance.PointText({
                      point: [textInput.x, textInput.y],
                      content: textInput.text,
                      fillColor: currentColor,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 16
                    });
                    text.opacity = 0;
                    const fadeIn = () => {
                      if (text.opacity < 1) {
                        text.opacity += 0.1;
                        requestAnimationFrame(fadeIn);
                      }
                    };
                    requestAnimationFrame(fadeIn);
                  }
                  setTextInput({ visible: false, x: 0, y: 0, text: '' });
                } else if (e.key === 'Escape') {
                  setTextInput({ visible: false, x: 0, y: 0, text: '' });
                }
              }}
              onBlur={() => {
                if (textInput.text.trim()) {
                  const text = new paperInstance.PointText({
                    point: [textInput.x, textInput.y],
                    content: textInput.text,
                    fillColor: currentColor,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16
                  });
                  text.opacity = 0;
                  const fadeIn = () => {
                    if (text.opacity < 1) {
                      text.opacity += 0.1;
                      requestAnimationFrame(fadeIn);
                    }
                  };
                  requestAnimationFrame(fadeIn);
                }
                setTextInput({ visible: false, x: 0, y: 0, text: '' });
              }}
              className="bg-transparent border-none outline-none text-base font-sans text-slate-900"
              autoFocus
            />
          </div>
        )}
        
        {/* Floating toolbar at the bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="floating-toolbar bg-white/95 backdrop-blur-sm rounded-full p-1.5 flex items-center shadow-lg border border-slate-200 transition-all">
            <CanvasToolbar 
              currentTool={currentTool} 
              onChangeTool={setCurrentTool} 
              currentColor={currentColor}
              onChangeColor={setCurrentColor}
              onSave={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 