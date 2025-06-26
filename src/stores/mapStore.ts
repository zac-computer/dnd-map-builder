import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type TerrainType = 'grass' | 'water' | 'sand' | 'stone';
export type ToolType = 'paint' | 'place' | 'pan';
export type ObjectType = 'tree' | 'rock' | 'building';

export interface GridCell {
  x: number;
  y: number;
  terrain: TerrainType;
}

export interface MapObject {
  id: string;
  x: number;
  y: number;
  type: ObjectType;
}

export interface ViewState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface MapState {
  // Grid configuration
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  
  // Map data
  terrain: Map<string, TerrainType>;
  objects: MapObject[];
  
  // UI state
  activeTool: ToolType;
  selectedTerrain: TerrainType;
  selectedObject: ObjectType;
  
  // View state
  view: ViewState;
  
  // Actions
  setGridSize: (width: number, height: number) => void;
  setCellSize: (size: number) => void;
  setTerrain: (x: number, y: number, terrain: TerrainType) => void;
  addObject: (object: Omit<MapObject, 'id'>) => void;
  removeObject: (id: string) => void;
  setActiveTool: (tool: ToolType) => void;
  setSelectedTerrain: (terrain: TerrainType) => void;
  setSelectedObject: (object: ObjectType) => void;
  setView: (view: Partial<ViewState>) => void;
  clearMap: () => void;
  loadMapData: (data: Partial<MapState>) => void;
  loadDemoMap: (terrain: Map<string, TerrainType>, objects: MapObject[], gridWidth: number, gridHeight: number, cellSize: number) => void;
}

const DEFAULT_GRID_SIZE = 50;
const DEFAULT_CELL_SIZE = 20;

export const mapStore = create<MapState>()(
  subscribeWithSelector((set) => ({
    // Initial state
    gridWidth: DEFAULT_GRID_SIZE,
    gridHeight: DEFAULT_GRID_SIZE,
    cellSize: DEFAULT_CELL_SIZE,
    terrain: new Map(),
    objects: [],
    activeTool: 'paint',
    selectedTerrain: 'grass',
    selectedObject: 'tree',
    view: {
      offsetX: 0,
      offsetY: 0,
      scale: 1,
    },

    // Actions
    setGridSize: (width: number, height: number) =>
      set({ gridWidth: width, gridHeight: height }),

    setCellSize: (size: number) => set({ cellSize: size }),

    setTerrain: (x: number, y: number, terrain: TerrainType) =>
      set((state) => {
        const newTerrain = new Map(state.terrain);
        const key = `${x},${y}`;
        newTerrain.set(key, terrain);
        return { terrain: newTerrain };
      }),

    addObject: (object: Omit<MapObject, 'id'>) =>
      set((state) => ({
        objects: [
          ...state.objects,
          { ...object, id: crypto.randomUUID() },
        ],
      })),

    removeObject: (id: string) =>
      set((state) => ({
        objects: state.objects.filter((obj) => obj.id !== id),
      })),

    setActiveTool: (tool: ToolType) => set({ activeTool: tool }),

    setSelectedTerrain: (terrain: TerrainType) => set({ selectedTerrain: terrain }),

    setSelectedObject: (object: ObjectType) => set({ selectedObject: object }),

    setView: (viewUpdate: Partial<ViewState>) =>
      set((state) => ({
        view: { ...state.view, ...viewUpdate },
      })),

    clearMap: () =>
      set({
        terrain: new Map(),
        objects: [],
      }),

    loadMapData: (data: Partial<MapState>) =>
      set((state) => ({
        ...state,
        ...data,
        terrain: data.terrain || state.terrain,
        objects: data.objects || state.objects,
      })),

    loadDemoMap: (terrain: Map<string, TerrainType>, objects: MapObject[], gridWidth: number, gridHeight: number, cellSize: number) =>
      set({
        terrain,
        objects,
        gridWidth,
        gridHeight,
        cellSize,
        view: {
          offsetX: 0,
          offsetY: 0,
          scale: 1,
        },
      }),
  }))
);

const useMapStore = mapStore;
export default useMapStore;