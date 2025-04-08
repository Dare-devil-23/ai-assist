import { Button } from "@/components/ui/button";
import { 
  Pencil, Square, Circle, 
  Save, Palette, Type,
  Eraser
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useState, useRef } from "react";

interface CanvasToolbarProps {
  currentTool: string;
  onChangeTool: (tool: string) => void;
  currentColor: string;
  onChangeColor: (color: string) => void;
  onSave: () => void;
}

export function CanvasToolbar({ 
  currentTool, 
  onChangeTool, 
  currentColor, 
  onChangeColor,
  onSave,
}: CanvasToolbarProps) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  
  const colors = [
    { name: "blue", hex: "#0070F3" },
    { name: "teal", hex: "#00BFA6" },
    { name: "purple", hex: "#7C3AED" },
    { name: "red", hex: "#EF4444" },
    { name: "amber", hex: "#F59E0B" },
    { name: "gray", hex: "#4B5563" },
    { name: "black", hex: "#111827" }
  ];
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center px-2 py-1.5 rounded-lg">
        <div className="flex space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-md ${currentTool === "pen" 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => onChangeTool("pen")}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Pencil (P)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-md ${currentTool === "text" 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => onChangeTool("text")}
              >
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Text (T)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-md ${currentTool === "shape" 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => onChangeTool("shape")}
              >
                <Square className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Rectangle (R)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-md ${currentTool === "circle" 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => onChangeTool("circle")}
              >
                <Circle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Circle (C)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-md ${currentTool === "eraser" 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => onChangeTool("eraser")}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Eraser (E)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="h-6 border-l border-slate-200 mx-2"></div>
        
        <div className="relative" ref={colorPickerRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-600"
                onClick={() => setColorPickerOpen(!colorPickerOpen)}
              >
                <Palette className="h-4 w-4" style={{color: currentColor}} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>Color</p>
            </TooltipContent>
          </Tooltip>
          
          {colorPickerOpen && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white/95 rounded-lg shadow-lg p-2 border border-slate-200 backdrop-blur-sm z-20">
              <div className="flex gap-1">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-5 h-5 rounded-full ${
                      currentColor === color.hex ? "ring-1 ring-offset-1 ring-blue-500" : ""
                    } transition-all hover:scale-110`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => {
                      onChangeColor(color.hex);
                      setColorPickerOpen(false);
                    }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="h-6 border-l border-slate-200 mx-2"></div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-600"
              onClick={onSave}
            >
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            <p>Save (⌘S)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
} 