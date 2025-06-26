'use client';

import { useState } from 'react';
import useMapStore from '@/lib/hooks/useMapStore';
import { cn } from '@/lib/utils';
import { demoMaps, getDemoMap } from '@/lib/demoMaps';
import type { TerrainType, ToolType, ObjectType } from '@/stores/mapStore';

const TERRAIN_OPTIONS: { type: TerrainType; label: string; color: string }[] = [
  { type: 'grass', label: 'Grass', color: 'bg-green-400' },
  { type: 'water', label: 'Water', color: 'bg-blue-500' },
  { type: 'sand', label: 'Sand', color: 'bg-yellow-400' },
  { type: 'stone', label: 'Stone', color: 'bg-gray-500' },
];

const OBJECT_OPTIONS: { type: ObjectType; label: string; icon: string }[] = [
  { type: 'tree', label: 'Tree', icon: '🌳' },
  { type: 'rock', label: 'Rock', icon: '🪨' },
  { type: 'building', label: 'Building', icon: '🏠' },
];

const TOOL_OPTIONS: { type: ToolType; label: string; icon: string }[] = [
  { type: 'paint', label: 'Paint', icon: '🖌️' },
  { type: 'place', label: 'Place', icon: '📍' },
  { type: 'pan', label: 'Pan', icon: '✋' },
];

export default function Toolbar() {
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  
  const {
    activeTool,
    selectedTerrain,
    selectedObject,
    setActiveTool,
    setSelectedTerrain,
    setSelectedObject,
    clearMap,
    loadDemoMap,
  } = useMapStore();

  const handleLoadDemoMap = (mapId: string) => {
    const demoMap = getDemoMap(mapId);
    if (demoMap) {
      loadDemoMap(
        demoMap.terrain,
        demoMap.objects,
        demoMap.gridWidth,
        demoMap.gridHeight,
        demoMap.cellSize
      );
    }
    setShowDemoDropdown(false);
  };

  return (
    <div className="flex h-16 items-center gap-4 border-b bg-white px-4">
      {/* Tool Selection */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700">Tools:</span>
        {TOOL_OPTIONS.map((tool) => (
          <button
            key={tool.type}
            onClick={() => setActiveTool(tool.type)}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              activeTool === tool.type
                ? 'bg-blue-100 text-blue-900'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <span>{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-gray-300" />

      {/* Terrain Selection (shown when paint tool is active) */}
      {activeTool === 'paint' && (
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700">Terrain:</span>
          {TERRAIN_OPTIONS.map((terrain) => (
            <button
              key={terrain.type}
              onClick={() => setSelectedTerrain(terrain.type)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                selectedTerrain === terrain.type
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <div className={cn('h-4 w-4 rounded', terrain.color)} />
              <span>{terrain.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Object Selection (shown when place tool is active) */}
      {activeTool === 'place' && (
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700">Objects:</span>
          {OBJECT_OPTIONS.map((object) => (
            <button
              key={object.type}
              onClick={() => setSelectedObject(object.type)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                selectedObject === object.type
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <span>{object.icon}</span>
              <span>{object.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Pan Instructions (shown when pan tool is active) */}
      {activeTool === 'pan' && (
        <div className="text-sm text-gray-600">
          Click and drag to pan the map. Use mouse wheel to zoom.
        </div>
      )}

      <div className="ml-auto flex gap-2">
        {/* Demo Maps Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDemoDropdown(!showDemoDropdown)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            📋 Load Demo
          </button>
          
          {showDemoDropdown && (
            <>
              {/* Backdrop to close dropdown */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDemoDropdown(false)}
              />
              
              {/* Dropdown menu */}
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-md border bg-white shadow-lg">
                <div className="p-2">
                  <div className="mb-2 px-3 py-2 text-sm font-medium text-gray-900">
                    Demo Maps
                  </div>
                  {demoMaps.map((demoMap) => (
                    <button
                      key={demoMap.id}
                      onClick={() => handleLoadDemoMap(demoMap.id)}
                      className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
                    >
                      <div className="font-medium text-gray-900">
                        {demoMap.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {demoMap.description}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {demoMap.gridWidth}×{demoMap.gridHeight} grid
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={clearMap}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Clear Map
        </button>
      </div>
    </div>
  );
}