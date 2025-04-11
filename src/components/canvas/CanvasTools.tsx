import { useEffect, useRef } from "react";

interface CanvasToolsProps {
  paperInstance: any;
  currentTool: string;
  currentColor: string;
  onTextInput: (x: number, y: number) => void;
}

export function CanvasTools({ paperInstance, currentTool, currentColor, onTextInput }: CanvasToolsProps) {
  const currentPathRef = useRef<any>(null);
  const currentShapeRef = useRef<any>(null);
  const startPointRef = useRef<any>(null);

  useEffect(() => {
    if (!paperInstance) return;

    // Cleanup previous tool
    const cleanup = () => {
      if (paperInstance.tool) {
        paperInstance.tool.remove();
      }
      if (currentPathRef.current) {
        currentPathRef.current = null;
      }
      if (currentShapeRef.current) {
        currentShapeRef.current = null;
      }
      if (startPointRef.current) {
        startPointRef.current = null;
      }
    };

    cleanup();

    // Setup new tool
    const setupTool = () => {
      switch (currentTool) {
        case "pen":
          paperInstance.tool = new paperInstance.Tool();
          
          paperInstance.tool.onMouseDown = (event: any) => {
            currentPathRef.current = new paperInstance.Path();
            currentPathRef.current.strokeColor = currentColor;
            currentPathRef.current.strokeWidth = 2;
            currentPathRef.current.strokeCap = 'round';
            currentPathRef.current.strokeJoin = 'round';
            currentPathRef.current.add(event.point);
          };
          
          paperInstance.tool.onMouseDrag = (event: any) => {
            if (currentPathRef.current) {
              currentPathRef.current.add(event.point);
              if (currentPathRef.current.segments.length > 3) {
                currentPathRef.current.smooth({ type: 'catmull-rom', factor: 0.5 });
              }
            }
          };
          
          paperInstance.tool.onMouseUp = () => {
            if (currentPathRef.current) {
              currentPathRef.current.simplify(2.5);
            }
          };
          break;

        case "text":
          paperInstance.tool = new paperInstance.Tool();
          paperInstance.tool.onMouseDown = (event: any) => {
            onTextInput(event.point.x, event.point.y);
          };
          break;

        case "rectangle":
          paperInstance.tool = new paperInstance.Tool();
          
          paperInstance.tool.onMouseDown = (event: any) => {
            startPointRef.current = event.point;
            currentShapeRef.current = new paperInstance.Path.Rectangle({
              from: startPointRef.current,
              to: startPointRef.current,
              strokeColor: currentColor,
              strokeWidth: 2,
              fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
            });
          };
          
          paperInstance.tool.onMouseDrag = (event: any) => {
            if (currentShapeRef.current && startPointRef.current) {
              currentShapeRef.current.remove();
              currentShapeRef.current = new paperInstance.Path.Rectangle({
                from: startPointRef.current,
                to: event.point,
                strokeColor: currentColor,
                strokeWidth: 2,
                fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
              });
            }
          };
          
          paperInstance.tool.onMouseUp = () => {
            currentShapeRef.current = null;
            startPointRef.current = null;
          };
          break;

        case "circle":
          paperInstance.tool = new paperInstance.Tool();
          
          paperInstance.tool.onMouseDown = (event: any) => {
            startPointRef.current = event.point;
            currentShapeRef.current = new paperInstance.Path.Circle({
              center: startPointRef.current,
              radius: 1,
              strokeColor: currentColor,
              strokeWidth: 2,
              fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
            });
          };
          
          paperInstance.tool.onMouseDrag = (event: any) => {
            if (currentShapeRef.current && startPointRef.current) {
              const radius = startPointRef.current.getDistance(event.point);
              currentShapeRef.current.remove();
              currentShapeRef.current = new paperInstance.Path.Circle({
                center: startPointRef.current,
                radius: radius,
                strokeColor: currentColor,
                strokeWidth: 2,
                fillColor: new paperInstance.Color(currentColor).set({ alpha: 0.1 })
              });
            }
          };
          
          paperInstance.tool.onMouseUp = () => {
            currentShapeRef.current = null;
            startPointRef.current = null;
          };
          break;

        case "eraser":
          paperInstance.tool = new paperInstance.Tool();
          let eraserPath: any = null;
          
          paperInstance.tool.onMouseDown = (event: any) => {
            eraserPath = new paperInstance.Path.Circle({
              center: event.point,
              radius: 10,
              fillColor: new paperInstance.Color(0.9, 0.9, 0.9, 0.5),
              strokeColor: new paperInstance.Color(0.5, 0.5, 0.5, 0.3),
              strokeWidth: 1
            });
            
            // Find items at the point and erase them
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
            if (eraserPath) {
              eraserPath.position = event.point;
            }
            
            // Find items at the point and erase them
            const hitResult = paperInstance.project.hitTest(event.point, {
              fill: true,
              stroke: true,
              tolerance: 10
            });
            
            if (hitResult && hitResult.item) {
              hitResult.item.remove();
            }
          };
          
          paperInstance.tool.onMouseUp = () => {
            if (eraserPath) {
              eraserPath.remove();
              eraserPath = null;
            }
          };
          break;
          
        default:
          break;
      }
    };

    setupTool();

    return cleanup;
  }, [paperInstance, currentTool, currentColor, onTextInput]);

  return null;
}