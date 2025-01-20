import './chip-list.css';
import Chip from './chip';
import type { ChipListType } from '@/types/chip';
import { useState } from 'react';

interface ChipListProps {
  items: ChipListType;
}

function ChipList({ items }: ChipListProps) {
  const [pressedIndex, updatePressedIndex] = useState<number>(0);

  const handleToggle = (willChangePressedIndex: number) => {
    updatePressedIndex(willChangePressedIndex);
  };

  return (
    <ul className="ChipList">
      {items.map((item, index) => {
        const isPressed = index === pressedIndex;

        return (
          <li key={item.id}>
            <Chip
              item={item}
              pressed={isPressed}
              index={index}
              onToggle={handleToggle}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ChipList;
