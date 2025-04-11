import { useState, useEffect } from "react";
import { CanvasToolbar } from "./CanvasToolbar";
import { Book, FileText, ClipboardList, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Canvas } from "./Canvas";
import { CanvasTools } from "./CanvasTools";
import { TabContent } from "./TabContent";

interface CanvasContainerProps {
  topicId: number;
}

export function CanvasContainer({ topicId }: CanvasContainerProps) {
  const [currentTool, setCurrentTool] = useState<string>("pen");
  const [currentColor, setCurrentColor] = useState<string>("#4F46E5");
  const [paperInstance, setPaperInstance] = useState<any>(null);
  const [textInput, setTextInput] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: ''
  });
  const [activeTab, setActiveTab] = useState<string>("book");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

  // Reset drawing state when tool changes
  useEffect(() => {
    setIsDrawing(false);
    setStartPoint(null);
  }, [currentTool]);

  const handleTextInput = (x: number, y: number) => {
    setTextInput({
      visible: true,
      x,
      y,
      text: ''
    });
  };

  const handleCanvasClick = (event: MouseEvent) => {
    if (!paperInstance) return;
    
    const x = event.offsetX;
    const y = event.offsetY;
    
    if (currentTool === "text") {
      handleTextInput(x, y);
    }
  };

  const renderContent = () => {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-background border border-border rounded-xl p-3 md:p-6">
        <div className="flex items-center justify-between mb-2 md:mb-6">
          <div className="flex space-x-2 md:space-x-4">
            <Button
              variant={activeTab === "book" ? "default" : "ghost"}
              onClick={() => setActiveTab("book")}
              className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-0.5 md:py-1 text-xs md:text-sm"
              title="Book"
            >
              <Book className="h-4 w-4" />
              <span className="hidden md:inline">Book</span>
            </Button>
            <Button
              variant={activeTab === "notes" ? "default" : "ghost"}
              onClick={() => setActiveTab("notes")}
              className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-0.5 md:py-1 text-xs md:text-sm"
              title="Notes"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Notes</span>
            </Button>
            <Button
              variant={activeTab === "questionBank" ? "default" : "ghost"}
              onClick={() => setActiveTab("questionBank")}
              className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-0.5 md:py-1 text-xs md:text-sm"
              title="Question Bank"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden md:inline">QB</span>
            </Button>
          </div>
          <Button
            variant={activeTab === "canvas" ? "default" : "outline"}
            onClick={() => setActiveTab("canvas")}
            className="flex items-center space-x-1 md:space-x-2 px-3 rounded-lg md:px-4 py-0.5 md:py-1 text-xs md:text-sm"
            title="Open Canvas"
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden md:inline">Canvas</span>
          </Button>
        </div>

        {activeTab === "canvas" ? (
          <div className="relative overflow-hidden bg-background border border-border rounded-xl h-full">
            <Canvas 
              onPaperInstance={setPaperInstance}
              className="absolute inset-0 w-full h-full"
              currentTool={currentTool}
              onCanvasClick={handleCanvasClick}
            />
            {paperInstance && (
              <CanvasTools
                paperInstance={paperInstance}
                currentTool={currentTool}
                currentColor={currentColor}
                onTextInput={handleTextInput}
              />
            )}
            
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
                      if (textInput.text.trim() && paperInstance) {
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
                    if (textInput.text.trim() && paperInstance) {
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
                  className="bg-background border border-border outline-none text-base font-sans text-foreground px-2 py-1 rounded-md"
                  autoFocus
                />
              </div>
            )}
            
            {/* Floating toolbar at the bottom */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[5]">
              <div className="floating-toolbar bg-background/95 backdrop-blur-sm rounded-full p-1 flex items-center shadow-md border border-border transition-all">
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
        ) : (
          <TabContent activeTab={activeTab} topicId={topicId} />
        )}
      </div>
    );
  };
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden md:mx-20 mb-14 md:mb-0 rounded-xl">
      {renderContent()}
    </div>
  );
}