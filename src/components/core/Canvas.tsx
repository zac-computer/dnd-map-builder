'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useMapStore from '@/lib/hooks/useMapStore';
import { getGridCoordinates, isPointInGrid } from '@/lib/utils';
import type { TerrainType } from '@/stores/mapStore';

const TERRAIN_COLORS: Record<TerrainType, string> = {
  grass: '#4ade80',
  water: '#3b82f6',
  sand: '#fbbf24',
  stone: '#6b7280',
};

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [touchStartDistance, setTouchStartDistance] = useState(0);
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);

  const {
    gridWidth,
    gridHeight,
    cellSize,
    terrain,
    objects,
    activeTool,
    selectedTerrain,
    selectedObject,
    view,
    setTerrain,
    addObject,
    setView,
  } = useMapStore();

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      const { offsetX, offsetY, scale } = view;

      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= gridWidth; x++) {
        const screenX = x * cellSize * scale + offsetX;
        if (screenX >= -10 && screenX <= canvas.width + 10) {
          ctx.beginPath();
          ctx.moveTo(screenX, offsetY);
          ctx.lineTo(screenX, gridHeight * cellSize * scale + offsetY);
          ctx.stroke();
        }
      }

      // Draw horizontal lines
      for (let y = 0; y <= gridHeight; y++) {
        const screenY = y * cellSize * scale + offsetY;
        if (screenY >= -10 && screenY <= canvas.height + 10) {
          ctx.beginPath();
          ctx.moveTo(offsetX, screenY);
          ctx.lineTo(gridWidth * cellSize * scale + offsetX, screenY);
          ctx.stroke();
        }
      }
    },
    [gridWidth, gridHeight, cellSize, view]
  );

  const drawTerrain = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { offsetX, offsetY, scale } = view;

      terrain.forEach((terrainType, key) => {
        const [x, y] = key.split(',').map(Number);
        const screenX = x * cellSize * scale + offsetX;
        const screenY = y * cellSize * scale + offsetY;
        const size = cellSize * scale;

        if (
          screenX + size >= 0 &&
          screenX <= ctx.canvas.width &&
          screenY + size >= 0 &&
          screenY <= ctx.canvas.height
        ) {
          ctx.fillStyle = TERRAIN_COLORS[terrainType];
          ctx.fillRect(screenX, screenY, size, size);
        }
      });
    },
    [terrain, cellSize, view]
  );

  const drawObjects = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { offsetX, offsetY, scale } = view;

      objects.forEach((obj) => {
        const screenX = obj.x * cellSize * scale + offsetX;
        const screenY = obj.y * cellSize * scale + offsetY;
        const size = cellSize * scale;

        if (
          screenX + size >= 0 &&
          screenX <= ctx.canvas.width &&
          screenY + size >= 0 &&
          screenY <= ctx.canvas.height
        ) {
          ctx.fillStyle = getObjectColor(obj.type);
          ctx.fillRect(
            screenX + size * 0.1,
            screenY + size * 0.1,
            size * 0.8,
            size * 0.8
          );
        }
      });
    },
    [objects, cellSize, view]
  );

  const getObjectColor = (type: string): string => {
    switch (type) {
      case 'tree':
        return '#15803d';
      case 'rock':
        return '#44403c';
      case 'building':
        return '#92400e';
      default:
        return '#000000';
    }
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw terrain first (behind grid)
    drawTerrain(ctx);

    // Draw grid
    drawGrid(ctx);

    // Draw objects on top
    drawObjects(ctx);
  }, [drawGrid, drawTerrain, drawObjects]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      setIsMouseDown(true);
      setLastMousePos({ x: mouseX, y: mouseY });

      if (activeTool === 'pan') {
        setIsPanning(true);
        return;
      }

      const { x: gridX, y: gridY } = getGridCoordinates(
        mouseX,
        mouseY,
        cellSize,
        view.offsetX,
        view.offsetY,
        view.scale
      );

      if (!isPointInGrid(gridX, gridY, gridWidth, gridHeight)) return;

      if (activeTool === 'paint') {
        setTerrain(gridX, gridY, selectedTerrain);
      } else if (activeTool === 'place') {
        addObject({ x: gridX, y: gridY, type: selectedObject });
      }
    },
    [
      activeTool,
      cellSize,
      view,
      gridWidth,
      gridHeight,
      selectedTerrain,
      selectedObject,
      setTerrain,
      addObject,
    ]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isPanning && isMouseDown) {
        const deltaX = mouseX - lastMousePos.x;
        const deltaY = mouseY - lastMousePos.y;
        setView({
          offsetX: view.offsetX + deltaX,
          offsetY: view.offsetY + deltaY,
        });
        setLastMousePos({ x: mouseX, y: mouseY });
        return;
      }

      if (isMouseDown && activeTool === 'paint') {
        const { x: gridX, y: gridY } = getGridCoordinates(
          mouseX,
          mouseY,
          cellSize,
          view.offsetX,
          view.offsetY,
          view.scale
        );

        if (isPointInGrid(gridX, gridY, gridWidth, gridHeight)) {
          setTerrain(gridX, gridY, selectedTerrain);
        }
      }
    },
    [
      isMouseDown,
      isPanning,
      lastMousePos,
      activeTool,
      view,
      cellSize,
      gridWidth,
      gridHeight,
      selectedTerrain,
      setView,
      setTerrain,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      const scaleChange = event.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.1, Math.min(3, view.scale * scaleChange));
      setView({ scale: newScale });
    },
    [view.scale, setView]
  );

  // Get touch coordinates (works with both React.Touch and native Touch)
  const getTouchCoordinates = useCallback((touch: Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }, []);

  // Calculate distance between two touches (for pinch-to-zoom)
  const getTouchDistance = useCallback((touch1: Touch, touch2: Touch, canvas: HTMLCanvasElement) => {
    const pos1 = getTouchCoordinates(touch1, canvas);
    const pos2 = getTouchCoordinates(touch2, canvas);
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  }, [getTouchCoordinates]);

  // Handle touch start (native touch event)
  const handleTouchStartNative = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const touches = event.touches;
      setIsTouching(true);

      if (touches.length === 1) {
        // Single touch - similar to mouse down
        const touch = touches[0];
        const { x: touchX, y: touchY } = getTouchCoordinates(touch, canvas);
        
        setLastTouchPos({ x: touchX, y: touchY });

        if (activeTool === 'pan') {
          setIsPanning(true);
          return;
        }

        const { x: gridX, y: gridY } = getGridCoordinates(
          touchX,
          touchY,
          cellSize,
          view.offsetX,
          view.offsetY,
          view.scale
        );

        if (!isPointInGrid(gridX, gridY, gridWidth, gridHeight)) return;

        if (activeTool === 'paint') {
          setTerrain(gridX, gridY, selectedTerrain);
        } else if (activeTool === 'place') {
          addObject({ x: gridX, y: gridY, type: selectedObject });
        }
      } else if (touches.length === 2) {
        // Two touches - pinch to zoom
        const distance = getTouchDistance(touches[0], touches[1], canvas);
        setTouchStartDistance(distance);
        setIsPanning(false);
      }
    },
    [
      activeTool,
      cellSize,
      view,
      gridWidth,
      gridHeight,
      selectedTerrain,
      selectedObject,
      setTerrain,
      addObject,
      getTouchCoordinates,
      getTouchDistance,
    ]
  );

  // Handle touch move (native touch event)
  const handleTouchMoveNative = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || !isTouching) return;

      const touches = event.touches;

      if (touches.length === 1) {
        // Single touch - panning or painting
        const touch = touches[0];
        const { x: touchX, y: touchY } = getTouchCoordinates(touch, canvas);

        if (isPanning || activeTool === 'pan') {
          const deltaX = touchX - lastTouchPos.x;
          const deltaY = touchY - lastTouchPos.y;
          setView({
            offsetX: view.offsetX + deltaX,
            offsetY: view.offsetY + deltaY,
          });
        } else if (activeTool === 'paint') {
          // Continuous painting while dragging
          const { x: gridX, y: gridY } = getGridCoordinates(
            touchX,
            touchY,
            cellSize,
            view.offsetX,
            view.offsetY,
            view.scale
          );

          if (isPointInGrid(gridX, gridY, gridWidth, gridHeight)) {
            setTerrain(gridX, gridY, selectedTerrain);
          }
        }

        setLastTouchPos({ x: touchX, y: touchY });
      } else if (touches.length === 2) {
        // Two touches - pinch to zoom
        const currentDistance = getTouchDistance(touches[0], touches[1], canvas);
        if (touchStartDistance > 0) {
          const scaleChange = currentDistance / touchStartDistance;
          const newScale = Math.max(0.1, Math.min(3, view.scale * scaleChange));
          setView({ scale: newScale });
          setTouchStartDistance(currentDistance);
        }
      }
    },
    [
      isTouching,
      isPanning,
      activeTool,
      lastTouchPos,
      view,
      cellSize,
      gridWidth,
      gridHeight,
      selectedTerrain,
      touchStartDistance,
      getTouchCoordinates,
      getTouchDistance,
      setView,
      setTerrain,
    ]
  );

  // Handle touch end (native touch event)
  const handleTouchEndNative = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      
      if (event.touches.length === 0) {
        // All touches ended
        setIsTouching(false);
        setIsPanning(false);
        setTouchStartDistance(0);
      } else if (event.touches.length === 1) {
        // One touch remaining, reset for single touch interaction
        const canvas = canvasRef.current;
        if (canvas) {
          const touch = event.touches[0];
          const { x: touchX, y: touchY } = getTouchCoordinates(touch, canvas);
          setLastTouchPos({ x: touchX, y: touchY });
        }
        setTouchStartDistance(0);
      }
    },
    [getTouchCoordinates]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        render();
      }
    };

    // Use the native touch event handlers directly

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Add non-passive touch event listeners
    canvas.addEventListener('touchstart', handleTouchStartNative, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    canvas.addEventListener('touchend', handleTouchEndNative, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEndNative, { passive: false });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('touchstart', handleTouchStartNative);
      canvas.removeEventListener('touchmove', handleTouchMoveNative);
      canvas.removeEventListener('touchend', handleTouchEndNative);
      canvas.removeEventListener('touchcancel', handleTouchEndNative);
    };
  }, [render, handleTouchStartNative, handleTouchMoveNative, handleTouchEndNative]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className="touch-none select-none cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  );
}
