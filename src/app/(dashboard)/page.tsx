'use client';

import Canvas from '@/components/core/Canvas';
import useMapPersistence from '@/lib/hooks/useMapPersistence';

export default function Home() {
  useMapPersistence();

  return (
    <div className="h-full w-full">
      <Canvas />
    </div>
  );
}
