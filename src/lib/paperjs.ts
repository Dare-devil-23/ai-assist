// This file provides utility functions for working with Paper.js

// Initialize Paper.js on a canvas element
export function initializePaper(canvasId: string): any {
  if (typeof window === 'undefined') return null;

  // Dynamically import Paper.js (client-side only)
  const paper = (window as any).paper;
  if (!paper) {
    console.error('Paper.js not loaded');
    return null;
  }

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) {
    console.error('Canvas element not found');
    return null;
  }

  paper.setup(canvas);
  return paper;
}

// Draw AI diagram showing narrow vs general AI
export function drawAIDiagram(paper: any, viewWidth: number, viewHeight: number) {
  // Clear previous content
  paper.project.clear();
  
  // Main circles
  const narrowAI = new paper.Path.Circle({
    center: [viewWidth * 0.3, viewHeight * 0.4],
    radius: 80,
    fillColor: new paper.Color(0.31, 0.28, 0.9, 0.1),
    strokeColor: new paper.Color(0.31, 0.28, 0.9),
    strokeWidth: 2
  });
  
  const generalAI = new paper.Path.Circle({
    center: [viewWidth * 0.7, viewHeight * 0.4],
    radius: 80,
    fillColor: new paper.Color(0.06, 0.73, 0.51, 0.1),
    strokeColor: new paper.Color(0.06, 0.73, 0.51),
    strokeWidth: 2
  });
  
  // Labels
  const narrowText = new paper.PointText({
    point: [narrowAI.position.x, narrowAI.position.y],
    content: 'Narrow AI',
    fillColor: new paper.Color(0.12, 0.16, 0.22),
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    justification: 'center'
  });
  
  const generalText = new paper.PointText({
    point: [generalAI.position.x, generalAI.position.y],
    content: 'General AI',
    fillColor: new paper.Color(0.12, 0.16, 0.22),
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    justification: 'center'
  });
  
  // Features for Narrow AI
  const narrowFeatures = [
    'Single Domain',
    'Specialized Tasks',
    'Limited Learning',
    'Exists Today'
  ];
  
  const generalFeatures = [
    'Multi-Domain',
    'Human-like Reasoning',
    'Adaptive Learning',
    'Theoretical Future'
  ];
  
  // Add features as text
  narrowFeatures.forEach((feature, index) => {
    new paper.PointText({
      point: [narrowAI.position.x, narrowAI.position.y + 30 + index * 20],
      content: '• ' + feature,
      fillColor: new paper.Color(0.12, 0.16, 0.22),
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      justification: 'center'
    });
  });
  
  generalFeatures.forEach((feature, index) => {
    new paper.PointText({
      point: [generalAI.position.x, generalAI.position.y + 30 + index * 20],
      content: '• ' + feature,
      fillColor: new paper.Color(0.12, 0.16, 0.22),
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      justification: 'center'
    });
  });
  
  // Add title
  new paper.PointText({
    point: [viewWidth * 0.5, 40],
    content: 'Types of Artificial Intelligence',
    fillColor: new paper.Color(0.12, 0.16, 0.22),
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    fontSize: 20,
    justification: 'center'
  });
  
  // Add simple icons
  const narrowIcon = new paper.Path.Circle({
    center: [narrowAI.position.x, narrowAI.position.y - 40],
    radius: 15,
    fillColor: new paper.Color(0.31, 0.28, 0.9, 0.2),
    strokeColor: new paper.Color(0.31, 0.28, 0.9),
    strokeWidth: 2
  });
  
  const generalIcon = new paper.Path.Circle({
    center: [generalAI.position.x, generalAI.position.y - 40],
    radius: 15,
    fillColor: new paper.Color(0.06, 0.73, 0.51, 0.2),
    strokeColor: new paper.Color(0.06, 0.73, 0.51),
    strokeWidth: 2
  });
  
  paper.view.draw();
}

// Draw from stored canvas data
export function drawFromData(paper: any, data: any) {
  if (!data || !data.objects) return;

  paper.project.clear();
  
  data.objects.forEach((obj: any) => {
    if (obj.type === 'circle') {
      new paper.Path.Circle({
        center: [obj.x, obj.y],
        radius: obj.radius,
        fillColor: obj.fillColor,
        strokeColor: obj.strokeColor,
        strokeWidth: obj.strokeWidth
      });
    } else if (obj.type === 'text') {
      new paper.PointText({
        point: [obj.x, obj.y],
        content: obj.content,
        fillColor: obj.fillColor,
        fontFamily: 'Inter, sans-serif',
        fontSize: obj.fontSize,
        fontWeight: obj.fontWeight || 'normal',
        justification: 'center'
      });
    }
  });
  
  paper.view.draw();
}

// Update canvas size
export function updateCanvasSize(paper: any, width: number, height: number) {
  if (!paper || !paper.view) return;
  
  paper.view.viewSize = new paper.Size(width, height);
  paper.view.draw();
}

// Tool functions
export function createPenTool(paper: any, color: string = '#4F46E5', width: number = 2) {
  if (!paper) return null;
  
  // Update cursor style to pencil
  const canvasElement = document.getElementById('paper-canvas');
  if (canvasElement) {
    canvasElement.classList.add('canvas-area');
    canvasElement.classList.remove('eraser', 'text-cursor', 'shape-cursor', 'circle-cursor');
  }
  
  const tool = new paper.Tool();
  let path: any = null;
  
  tool.onMouseDown = (event: any) => {
    // Create main drawing path
    path = new paper.Path();
    path.strokeColor = color;
    path.strokeWidth = width;
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
    path.add(event.point);
    
    // Add Notion-like dot effect at start point
    const startDot = new paper.Path.Circle({
      center: event.point,
      radius: width * 0.8,
      fillColor: color
    });
    
    // Animate the dot to fade out - Notion-like effect
    let opacity = 1;
    let scale = 1;
    
    const fadeOut = () => {
      opacity -= 0.1;
      scale += 0.05;
      
      if (opacity > 0) {
        startDot.opacity = opacity;
        startDot.scale(scale);
        requestAnimationFrame(fadeOut);
      } else {
        startDot.remove();
      }
    };
    
    requestAnimationFrame(fadeOut);
  };
  
  tool.onMouseDrag = (event: any) => {
    if (path) {
      path.add(event.point);
      
      // Smooth the path as you draw - Notion-like effect
      if (path.segments.length > 3) {
        path.smooth({ type: 'catmull-rom', factor: 0.5 });
      }
    }
  };
  
  tool.onMouseUp = () => {
    if (path) {
      // Simplify the path with higher tolerance for Notion-like smoothness
      path.simplify(2.5);
    }
  };
  
  return tool;
}

// Create text tool
export function createTextTool(paper: any, color: string = '#4F46E5', fontSize: number = 16) {
  if (!paper) return null;
  
  // Update cursor style
  const canvasElement = document.getElementById('paper-canvas');
  if (canvasElement) {
    canvasElement.classList.add('text-cursor');
    canvasElement.classList.remove('canvas-area', 'eraser', 'shape-cursor', 'circle-cursor');
  }
  
  const tool = new paper.Tool();
  let textItem: any = null;
  
  tool.onMouseDown = (event: any) => {
    // Create new text item
    textItem = new paper.PointText({
      point: event.point,
      content: 'Click to edit text',
      fillColor: color,
      fontFamily: 'Inter, sans-serif',
      fontSize: fontSize,
      fontWeight: 'normal'
    });
    
    // Animation: fade in
    textItem.opacity = 0;
    const fadeIn = () => {
      if (textItem.opacity < 1) {
        textItem.opacity += 0.1;
        requestAnimationFrame(fadeIn);
      }
    };
    requestAnimationFrame(fadeIn);
    
    // Simulate text editing (in a real implementation, this would open a text input)
    setTimeout(() => {
      const newText = prompt('Enter text:', 'Text element');
      if (newText !== null) {
        textItem.content = newText;
      }
    }, 100);
  };
  
  return tool;
}

// Create rectangle shape tool
export function createShapeTool(paper: any, color: string = '#4F46E5', width: number = 2) {
  if (!paper) return null;
  
  // Update cursor style
  const canvasElement = document.getElementById('paper-canvas');
  if (canvasElement) {
    canvasElement.classList.add('shape-cursor');
    canvasElement.classList.remove('canvas-area', 'eraser', 'text-cursor', 'circle-cursor');
  }
  
  const tool = new paper.Tool();
  let rectangle: any = null;
  let startPoint: any = null;
  
  tool.onMouseDown = (event: any) => {
    startPoint = event.point;
    rectangle = new paper.Path.Rectangle({
      from: startPoint,
      to: startPoint,
      strokeColor: color,
      strokeWidth: width,
      fillColor: new paper.Color(color).set({ alpha: 0.1 })
    });
  };
  
  tool.onMouseDrag = (event: any) => {
    if (rectangle) {
      rectangle.remove();
      rectangle = new paper.Path.Rectangle({
        from: startPoint,
        to: event.point,
        strokeColor: color,
        strokeWidth: width,
        fillColor: new paper.Color(color).set({ alpha: 0.1 })
      });
    }
  };
  
  return tool;
}

// Create circle tool
export function createCircleTool(paper: any, color: string = '#4F46E5', width: number = 2) {
  if (!paper) return null;
  
  // Update cursor style
  const canvasElement = document.getElementById('paper-canvas');
  if (canvasElement) {
    canvasElement.classList.add('circle-cursor');
    canvasElement.classList.remove('canvas-area', 'eraser', 'text-cursor', 'shape-cursor');
  }
  
  const tool = new paper.Tool();
  let circle: any = null;
  let center: any = null;
  
  tool.onMouseDown = (event: any) => {
    center = event.point;
    circle = new paper.Path.Circle({
      center: center,
      radius: 1,
      strokeColor: color,
      strokeWidth: width,
      fillColor: new paper.Color(color).set({ alpha: 0.1 })
    });
  };
  
  tool.onMouseDrag = (event: any) => {
    if (circle) {
      const radius = center.getDistance(event.point);
      circle.remove();
      circle = new paper.Path.Circle({
        center: center,
        radius: radius,
        strokeColor: color,
        strokeWidth: width,
        fillColor: new paper.Color(color).set({ alpha: 0.1 })
      });
    }
  };
  
  return tool;
}

// Create AI diagram tool (placeholder for now - would integrate with an AI service)
export function createAITool(paper: any) {
  if (!paper) return null;
  
  const tool = new paper.Tool();
  
  tool.onMouseDown = (event: any) => {
    // In a real implementation, this would call an AI service to generate diagram
    // For now, we'll just draw a predefined AI diagram at the clicked position
    const centerX = event.point.x;
    const centerY = event.point.y;
    
    // Draw a simple neural network diagram
    const layer1 = [];
    const layer2 = [];
    const layer3 = [];
    
    // Input layer
    for (let i = 0; i < 3; i++) {
      const y = centerY - 40 + i * 40;
      const node = new paper.Path.Circle({
        center: [centerX - 100, y],
        radius: 10,
        fillColor: new paper.Color(0.31, 0.28, 0.9, 0.3),
        strokeColor: new paper.Color(0.31, 0.28, 0.9),
        strokeWidth: 1
      });
      layer1.push(node);
    }
    
    // Hidden layer
    for (let i = 0; i < 4; i++) {
      const y = centerY - 60 + i * 40;
      const node = new paper.Path.Circle({
        center: [centerX, y],
        radius: 10,
        fillColor: new paper.Color(0.5, 0.3, 0.9, 0.3),
        strokeColor: new paper.Color(0.5, 0.3, 0.9),
        strokeWidth: 1
      });
      layer2.push(node);
    }
    
    // Output layer
    for (let i = 0; i < 2; i++) {
      const y = centerY - 20 + i * 40;
      const node = new paper.Path.Circle({
        center: [centerX + 100, y],
        radius: 10,
        fillColor: new paper.Color(0.7, 0.3, 0.9, 0.3),
        strokeColor: new paper.Color(0.7, 0.3, 0.9),
        strokeWidth: 1
      });
      layer3.push(node);
    }
    
    // Connect all nodes
    for (const node1 of layer1) {
      for (const node2 of layer2) {
        const path = new paper.Path.Line({
          from: node1.position,
          to: node2.position,
          strokeColor: new paper.Color(0.4, 0.4, 0.8, 0.2),
          strokeWidth: 1
        });
      }
    }
    
    for (const node2 of layer2) {
      for (const node3 of layer3) {
        const path = new paper.Path.Line({
          from: node2.position,
          to: node3.position,
          strokeColor: new paper.Color(0.5, 0.4, 0.9, 0.2),
          strokeWidth: 1
        });
      }
    }
    
    // Add layer labels
    new paper.PointText({
      point: [centerX - 100, centerY + 80],
      content: 'Input Layer',
      fillColor: '#666',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      justification: 'center'
    });
    
    new paper.PointText({
      point: [centerX, centerY + 80],
      content: 'Hidden Layer',
      fillColor: '#666',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      justification: 'center'
    });
    
    new paper.PointText({
      point: [centerX + 100, centerY + 80],
      content: 'Output Layer',
      fillColor: '#666',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      justification: 'center'
    });
  };
  
  return tool;
}

// Create eraser tool
export function createEraserTool(paper: any, width: number = 20) {
  if (!paper) return null;
  
  // Update cursor style to eraser
  const canvasElement = document.getElementById('paper-canvas');
  if (canvasElement) {
    canvasElement.classList.add('eraser');
    canvasElement.classList.remove('canvas-area', 'text-cursor', 'shape-cursor', 'circle-cursor');
  }
  
  const tool = new paper.Tool();
  let eraserPath: any = null;
  
  tool.onMouseDown = (event: any) => {
    // Create visual feedback for eraser
    eraserPath = new paper.Path.Circle({
      center: event.point,
      radius: width / 2,
      fillColor: new paper.Color(1, 1, 1, 0.5),
      strokeColor: new paper.Color(0, 0, 0, 0.3),
      strokeWidth: 1
    });
    
    // Find items at this point and remove them
    const hitResult = paper.project.hitTest(event.point, {
      fill: true,
      stroke: true,
      tolerance: width / 2
    });
    
    if (hitResult && hitResult.item) {
      // Add fade-out animation before removing
      const item = hitResult.item;
      let opacity = item.opacity || 1;
      
      const fadeOut = () => {
        opacity -= 0.2;
        
        if (opacity > 0) {
          item.opacity = opacity;
          requestAnimationFrame(fadeOut);
        } else {
          item.remove();
        }
      };
      
      requestAnimationFrame(fadeOut);
    }
  };
  
  tool.onMouseDrag = (event: any) => {
    // Move the visual eraser
    if (eraserPath) {
      eraserPath.position = event.point;
    }
    
    // Find items at this point and remove them
    const hitResult = paper.project.hitTest(event.point, {
      fill: true,
      stroke: true,
      tolerance: width / 2
    });
    
    if (hitResult && hitResult.item && hitResult.item !== eraserPath) {
      hitResult.item.remove();
    }
  };
  
  tool.onMouseUp = () => {
    // Remove the visual eraser
    if (eraserPath) {
      eraserPath.remove();
      eraserPath = null;
    }
  };
  
  return tool;
}

// Convert Paper.js project to serializable format
export function serializeCanvas(paper: any) {
  if (!paper || !paper.project) return { objects: [] };
  
  const objects: any[] = [];
  
  paper.project.activeLayer.children.forEach((item: any) => {
    if (item instanceof paper.Path.Circle) {
      objects.push({
        type: 'circle',
        x: item.position.x,
        y: item.position.y,
        radius: item.bounds.width / 2,
        fillColor: item.fillColor?.toCSS(true) || 'rgba(255,255,255,0)',
        strokeColor: item.strokeColor?.toCSS(true) || '#000',
        strokeWidth: item.strokeWidth || 1
      });
    } else if (item instanceof paper.PointText) {
      objects.push({
        type: 'text',
        x: item.position.x,
        y: item.position.y,
        content: item.content,
        fillColor: item.fillColor?.toCSS(true) || '#000',
        fontSize: item.fontSize || 12,
        fontWeight: item.fontWeight || 'normal'
      });
    }
  });
  
  return { objects };
}
