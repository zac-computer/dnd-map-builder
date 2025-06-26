'use client';

import Canvas from '@/components/core/Canvas';
import Toolbar from '@/components/core/Toolbar';
import useMapPersistence from '@/lib/hooks/useMapPersistence';

export default function Home() {
  useMapPersistence();

  return (
    <div className="flex h-screen flex-col">
      <Toolbar />
      <main className="flex-1 overflow-hidden">
        <div className="h-full w-full">
          <Canvas />
        </div>
      </main>
    </div>
  );
}
