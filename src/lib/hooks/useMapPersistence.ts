'use client';

import { useEffect } from 'react';
import useMapStore, { mapStore } from '@/stores/mapStore';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils';
import type { TerrainType, MapObject } from '@/stores/mapStore';

const MAP_STORAGE_KEY = 'dnd-map-builder-state';

interface PersistedMapData {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  terrain: [string, TerrainType][]; // Serialized Map as array of key-value pairs
  objects: MapObject[];
  lastSaved: number;
}

export default function useMapPersistence() {
  const store = useMapStore();

  // Load saved map data on initialization
  useEffect(() => {
    const savedData = loadFromLocalStorage<PersistedMapData>(MAP_STORAGE_KEY);
    
    if (savedData) {
      try {
        // Convert serialized terrain data back to Map
        const terrainMap = new Map(savedData.terrain);
        
        store.loadMapData({
          gridWidth: savedData.gridWidth,
          gridHeight: savedData.gridHeight,
          cellSize: savedData.cellSize,
          terrain: terrainMap,
          objects: savedData.objects,
        });
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    }
  }, [store]);

  // Save map data whenever the store changes
  useEffect(() => {
    const unsubscribe = mapStore.subscribe((state) => {
      // Create serializable version of the state
      const dataToSave: PersistedMapData = {
        gridWidth: state.gridWidth,
        gridHeight: state.gridHeight,
        cellSize: state.cellSize,
        terrain: Array.from(state.terrain.entries()), // Convert Map to array
        objects: state.objects,
        lastSaved: Date.now(),
      };

      saveToLocalStorage(MAP_STORAGE_KEY, dataToSave);
    });

    return unsubscribe;
  }, []);

  const clearSavedData = () => {
    localStorage.removeItem(MAP_STORAGE_KEY);
  };

  const exportMapData = () => {
    const { gridWidth, gridHeight, cellSize, terrain, objects } = mapStore.getState();
    const exportData: PersistedMapData = {
      gridWidth,
      gridHeight,
      cellSize,
      terrain: Array.from(terrain.entries()),
      objects,
      lastSaved: Date.now(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dnd-map-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    clearSavedData,
    exportMapData,
  };
}