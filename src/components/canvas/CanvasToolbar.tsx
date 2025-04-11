import { Pen, Eraser, Type, Square, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  onSave
}: CanvasToolbarProps) {
  const colors = [
    { name: "Indigo", value: "#4F46E5" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Emerald", value: "#10B981" },
    { name: "Sky", value: "#0EA5E9" },
    { name: "Violet", value: "#8B5CF6" },
    { name: "Black", value: "#171717" },
  ];

  const tools = [
    { name: "pen", icon: <Pen className="h-3.5 w-3.5" />, label: "Pen" },
    { name: "eraser", icon: <Eraser className="h-3.5 w-3.5" />, label: "Eraser" },
    { name: "text", icon: <Type className="h-3.5 w-3.5" />, label: "Text" },
    { name: "rectangle", icon: <Square className="h-3.5 w-3.5" />, label: "Rectangle" },
    { name: "circle", icon: <Circle className="h-3.5 w-3.5" />, label: "Circle" },
  ];

  return (
    <div className="flex items-center space-x-0.5 bg-background p-1 rounded-full">
      {tools.map((tool) => (
        <Button
          key={tool.name}
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 w-7 p-0 rounded-full",
            currentTool === tool.name && "bg-secondary text-foreground"
          )}
          onClick={() => onChangeTool(tool.name)}
          title={tool.label}
        >
          {tool.icon}
        </Button>
      ))}

      <div className="h-4 w-px bg-border mx-0.5"></div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full overflow-hidden"
            title="Color"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1.5 bg-background border-border shadow-md rounded-lg" align="center">
          <div className="grid grid-cols-7 gap-1.5">
            {colors.map((color) => (
              <button
                key={color.value}
                className={cn(
                  "w-5 h-5 rounded-full",
                  currentColor === color.value && "ring-1.5 ring-primary ring-offset-1"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => onChangeColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}