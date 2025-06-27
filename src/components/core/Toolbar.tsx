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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="border-b bg-white shadow-sm">
      {/* Header with title and GitHub links */}
      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2 sm:px-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
            🗺️ <span className="hidden sm:inline">DnD Map Builder</span>
            <span className="sm:hidden">DMB</span>
          </h1>
          <span className="hidden text-sm text-gray-500 sm:inline">
            Interactive map creation for D&D campaigns
          </span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop GitHub links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <a
              href="https://github.com/zac-computer/dnd-map-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">View Source</span>
            </a>
            <a
              href="https://github.com/zac-computer/dnd-map-builder/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden sm:inline">Report Issue</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 bg-black sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-80 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile GitHub Links */}
              <div className="mb-6 space-y-2">
                <a
                  href="https://github.com/zac-computer/dnd-map-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>View Source Code</span>
                </a>
                <a
                  href="https://github.com/zac-computer/dnd-map-builder/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Report an Issue</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Toolbar controls */}
      <div className="hidden sm:flex sm:h-16 sm:items-center sm:gap-4 sm:px-4">
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
                <div className="absolute top-full right-0 z-20 mt-2 w-80 rounded-md border bg-white shadow-lg">
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

      {/* Mobile Bottom Toolbar - More Compact */}
      <div className="sm:hidden">
        {/* Compact Tool Selection */}
        <div className="border-b border-gray-100 px-3 py-2">
          <div className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Tools
          </div>
          <div className="flex gap-1">
            {TOOL_OPTIONS.map((tool) => (
              <button
                key={tool.type}
                onClick={() => setActiveTool(tool.type)}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors',
                  activeTool === tool.type
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <span className="text-base">{tool.icon}</span>
                <span className="text-xs">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Compact Content Selection */}
        <div className="border-b border-gray-100 px-3 py-2">
          {/* Terrain Selection (shown when paint tool is active) */}
          {activeTool === 'paint' && (
            <>
              <div className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Terrain
              </div>
              <div className="grid grid-cols-4 gap-1">
                {TERRAIN_OPTIONS.map((terrain) => (
                  <button
                    key={terrain.type}
                    onClick={() => setSelectedTerrain(terrain.type)}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors',
                      selectedTerrain === terrain.type
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className={cn('h-3 w-3 rounded', terrain.color)} />
                    <span className="text-xs">{terrain.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Object Selection (shown when place tool is active) */}
          {activeTool === 'place' && (
            <>
              <div className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Objects
              </div>
              <div className="flex gap-1">
                {OBJECT_OPTIONS.map((object) => (
                  <button
                    key={object.type}
                    onClick={() => setSelectedObject(object.type)}
                    className={cn(
                      'flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors',
                      selectedObject === object.type
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <span className="text-base">{object.icon}</span>
                    <span className="text-xs">{object.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Pan Instructions (shown when pan tool is active) */}
          {activeTool === 'pan' && (
            <div className="text-xs text-gray-600">
              Touch and drag to pan. Pinch to zoom.
            </div>
          )}
        </div>

        {/* Compact Action Buttons */}
        <div className="px-3 py-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <button
                onClick={() => setShowDemoDropdown(!showDemoDropdown)}
                className="w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                📋 Demo
              </button>
              {showDemoDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDemoDropdown(false)}
                  />
                  <div className="absolute bottom-full left-0 z-20 mb-2 w-72 rounded-md border bg-white shadow-lg">
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
              className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
