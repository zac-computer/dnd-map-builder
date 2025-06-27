import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGridCoordinates(
  mouseX: number,
  mouseY: number,
  cellSize: number,
  offsetX: number,
  offsetY: number,
  scale: number
): { x: number; y: number } {
  const adjustedX = (mouseX - offsetX) / scale;
  const adjustedY = (mouseY - offsetY) / scale;

  return {
    x: Math.floor(adjustedX / cellSize),
    y: Math.floor(adjustedY / cellSize),
  };
}

export function getScreenCoordinates(
  gridX: number,
  gridY: number,
  cellSize: number,
  offsetX: number,
  offsetY: number,
  scale: number
): { x: number; y: number } {
  return {
    x: gridX * cellSize * scale + offsetX,
    y: gridY * cellSize * scale + offsetY,
  };
}

export function isPointInGrid(
  x: number,
  y: number,
  gridWidth: number,
  gridHeight: number
): boolean {
  return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
}

export function saveToLocalStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}
