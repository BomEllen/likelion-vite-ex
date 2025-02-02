import { useState } from 'react';
import type { ChipListType } from '@/types/chip';
import ChipList from '@/components/chip/chip-list';
import { chips } from '@/data/chips';

function Playground() {
  const [chipData] = useState<ChipListType>(chips);

  return (
    <div className="Playground" style={{ marginInline: 40 }}>
      <h1>Playground</h1>
      <div
        style={{
          inlineSize: 320,
          blockSize: 640,
          border: '4px solid rgba(0 0 0 / 10%)',
          borderRadius: 12,
          padding: 8,
        }}
      >
        <ChipList items={chipData} />
      </div>
    </div>
  );
}

export default Playground;
