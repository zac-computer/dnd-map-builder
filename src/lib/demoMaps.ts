import type { TerrainType, MapObject } from '@/stores/mapStore';

export interface DemoMapData {
  id: string;
  name: string;
  description: string;
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  terrain: Map<string, TerrainType>;
  objects: MapObject[];
}

// Helper function to create terrain data from a 2D array
function createTerrainFromPattern(
  pattern: string[][],
  terrainMap: Record<string, TerrainType>
): Map<string, TerrainType> {
  const terrain = new Map<string, TerrainType>();
  
  pattern.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== ' ' && terrainMap[cell]) {
        terrain.set(`${x},${y}`, terrainMap[cell]);
      }
    });
  });
  
  return terrain;
}

// Demo Map: "The Riverside Tavern"
export const riversideTavernMap: DemoMapData = {
  id: 'riverside-tavern',
  name: 'The Riverside Tavern',
  description: 'A cozy tavern by the river with a small village, perfect for starting adventures.',
  gridWidth: 30,
  gridHeight: 25,
  cellSize: 20,
  terrain: createTerrainFromPattern([
    // Pattern using symbols: G=grass, W=water, S=sand, R=stone (roads)
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','G','G','G','G','G'],
    ['G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G','G','G','G','G'],
    ['G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G','G','G','G','G'],
    ['G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G','G','G','G','G'],
    ['G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G','G','G','G','G'],
    ['G','G','G','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','G','G','G','G','G'],
    ['G','G','G','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
    ['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'],
    ['S','S','S','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','S','S','S','S'],
    ['S','S','S','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','S','S','S','S'],
    ['S','S','S','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','S','S','S','S'],
    ['S','S','S','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','S','S','S','S'],
    ['S','S','S','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','S','S','S','S'],
    ['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ], {
    'G': 'grass',
    'W': 'water',
    'S': 'sand',
    'R': 'stone'
  }),
  objects: [
    // Tavern building (main structure)
    { id: '1', x: 12, y: 5, type: 'building' },
    { id: '2', x: 13, y: 5, type: 'building' },
    { id: '3', x: 14, y: 5, type: 'building' },
    { id: '4', x: 15, y: 5, type: 'building' },
    { id: '5', x: 12, y: 6, type: 'building' },
    { id: '6', x: 13, y: 6, type: 'building' },
    { id: '7', x: 14, y: 6, type: 'building' },
    { id: '8', x: 15, y: 6, type: 'building' },
    { id: '9', x: 12, y: 7, type: 'building' },
    { id: '10', x: 13, y: 7, type: 'building' },
    { id: '11', x: 14, y: 7, type: 'building' },
    { id: '12', x: 15, y: 7, type: 'building' },
    
    // Small houses in the village
    { id: '13', x: 6, y: 5, type: 'building' },
    { id: '14', x: 7, y: 5, type: 'building' },
    { id: '15', x: 6, y: 6, type: 'building' },
    { id: '16', x: 7, y: 6, type: 'building' },
    
    { id: '17', x: 19, y: 5, type: 'building' },
    { id: '18', x: 20, y: 5, type: 'building' },
    { id: '19', x: 19, y: 6, type: 'building' },
    { id: '20', x: 20, y: 6, type: 'building' },
    
    { id: '21', x: 10, y: 7, type: 'building' },
    { id: '22', x: 18, y: 7, type: 'building' },
    
    // Trees around the village
    { id: '23', x: 2, y: 2, type: 'tree' },
    { id: '24', x: 4, y: 1, type: 'tree' },
    { id: '25', x: 6, y: 2, type: 'tree' },
    { id: '26', x: 1, y: 4, type: 'tree' },
    { id: '27', x: 3, y: 6, type: 'tree' },
    { id: '28', x: 5, y: 8, type: 'tree' },
    { id: '29', x: 1, y: 10, type: 'tree' },
    { id: '30', x: 4, y: 11, type: 'tree' },
    
    // Trees on the right side
    { id: '31', x: 27, y: 2, type: 'tree' },
    { id: '32', x: 28, y: 4, type: 'tree' },
    { id: '33', x: 26, y: 6, type: 'tree' },
    { id: '34', x: 29, y: 8, type: 'tree' },
    { id: '35', x: 27, y: 10, type: 'tree' },
    { id: '36', x: 25, y: 11, type: 'tree' },
    
    // Trees near the river
    { id: '37', x: 2, y: 14, type: 'tree' },
    { id: '38', x: 5, y: 13, type: 'tree' },
    { id: '39', x: 8, y: 15, type: 'tree' },
    { id: '40', x: 11, y: 14, type: 'tree' },
    { id: '41', x: 18, y: 13, type: 'tree' },
    { id: '42', x: 22, y: 15, type: 'tree' },
    { id: '43', x: 26, y: 14, type: 'tree' },
    { id: '44', x: 28, y: 13, type: 'tree' },
    
    // Rocks along the riverbank
    { id: '45', x: 4, y: 17, type: 'rock' },
    { id: '46', x: 8, y: 16, type: 'rock' },
    { id: '47', x: 12, y: 17, type: 'rock' },
    { id: '48', x: 16, y: 16, type: 'rock' },
    { id: '49', x: 20, y: 17, type: 'rock' },
    { id: '50', x: 24, y: 16, type: 'rock' },
    { id: '51', x: 27, y: 17, type: 'rock' },
    
    // Some scattered rocks for natural feel
    { id: '52', x: 9, y: 3, type: 'rock' },
    { id: '53', x: 17, y: 4, type: 'rock' },
    { id: '54', x: 23, y: 8, type: 'rock' },
    { id: '55', x: 2, y: 12, type: 'rock' },
  ]
};

// Demo Map: "Mountain Pass"
export const mountainPassMap: DemoMapData = {
  id: 'mountain-pass',
  name: 'Treacherous Mountain Pass',
  description: 'A narrow mountain pass with rocky terrain and scattered boulders, perfect for ambushes.',
  gridWidth: 25,
  gridHeight: 20,
  cellSize: 20,
  terrain: createTerrainFromPattern([
    ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','G','G','G','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','G','G','G','G','G','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R'],
    ['R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R'],
    ['R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R'],
    ['R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R'],
    ['R','R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','G','G','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','G','G','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','G','G','G','G','G','G','G','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','G','G','G','G','G','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','G','G','G','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
  ], {
    'G': 'grass',
    'R': 'stone'
  }),
  objects: [
    // Large boulders for cover
    { id: '1', x: 6, y: 8, type: 'rock' },
    { id: '2', x: 7, y: 8, type: 'rock' },
    { id: '3', x: 11, y: 6, type: 'rock' },
    { id: '4', x: 12, y: 6, type: 'rock' },
    { id: '5', x: 15, y: 9, type: 'rock' },
    { id: '6', x: 16, y: 9, type: 'rock' },
    { id: '7', x: 9, y: 12, type: 'rock' },
    { id: '8', x: 10, y: 12, type: 'rock' },
    { id: '9', x: 14, y: 13, type: 'rock' },
    { id: '10', x: 18, y: 11, type: 'rock' },
    
    // Scattered smaller rocks
    { id: '11', x: 5, y: 10, type: 'rock' },
    { id: '12', x: 8, y: 7, type: 'rock' },
    { id: '13', x: 13, y: 8, type: 'rock' },
    { id: '14', x: 17, y: 7, type: 'rock' },
    { id: '15', x: 19, y: 10, type: 'rock' },
    { id: '16', x: 12, y: 11, type: 'rock' },
    { id: '17', x: 7, y: 13, type: 'rock' },
    { id: '18', x: 16, y: 14, type: 'rock' },
    
    // A few hardy mountain trees
    { id: '19', x: 4, y: 9, type: 'tree' },
    { id: '20', x: 20, y: 8, type: 'tree' },
    { id: '21', x: 6, y: 14, type: 'tree' },
    { id: '22', x: 18, y: 13, type: 'tree' },
  ]
};

export const demoMaps = [riversideTavernMap, mountainPassMap];

export function getDemoMap(id: string): DemoMapData | undefined {
  return demoMaps.find(map => map.id === id);
}