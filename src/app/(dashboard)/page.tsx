'use client';

import Canvas from '@/components/core/Canvas';
import useMapPersistence from '@/lib/hooks/useMapPersistence';

export default function Home() {
  useMapPersistence();

  return (
    <div className="flex h-full w-full flex-col">
      <Canvas />
    </div>
  );
}
