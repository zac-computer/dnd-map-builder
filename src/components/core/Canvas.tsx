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

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [render]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  );
}
