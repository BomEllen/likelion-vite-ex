import { tm } from '@/utils/tw-merge';
import { useContext } from 'react';
import { TicTacToeContext } from '../contexts/tic-tac-toe';
import Cell from './cell';

function Grid() {
  const { currentCells: cells, winner } = useContext(TicTacToeContext);

  const handleKeyControl = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(e.currentTarget.querySelectorAll('button'));
    const activeButtonIndex = buttons.findIndex(
      (button) => document.activeElement === button
    );

    const lastCellIndex = cells.length - 1;
    let nextMoveIndex = activeButtonIndex;

    switch (e.code) {
      case 'ArrowUp': {
        nextMoveIndex = activeButtonIndex - 3;
        if (nextMoveIndex < 0) return;
        break;
      }
      case 'ArrowDown': {
        nextMoveIndex = activeButtonIndex + 3;

        if (
          (nextMoveIndex % 3 === 0 && nextMoveIndex > lastCellIndex - 2) ||
          (nextMoveIndex % 3 === 1 && nextMoveIndex > lastCellIndex - 1) ||
          (nextMoveIndex % 3 === 2 && nextMoveIndex > lastCellIndex)
        ) {
          return;
        }

        break;
      }
      case 'ArrowRight':
        {
          nextMoveIndex = activeButtonIndex + 1;

          if (nextMoveIndex % 3 === 0) {
            return;
          }
        }
        break;
      case 'ArrowLeft': {
        nextMoveIndex = activeButtonIndex - 1;
        if (nextMoveIndex % 3 < 0 || nextMoveIndex % 3 === 3 - 1) {
          return;
        }
      }
    }

    buttons[nextMoveIndex]?.focus();
  };

  return (
    <div
      role="grid"
      tabIndex={-1}
      className={tm('grid grid-rows-3 grid-cols-3 gap-1')}
      onKeyDown={handleKeyControl}
    >
      {cells.map((cell, index) => {
        let winnerClasses = '';

        // 승리자가 있다면?
        if (winner) {
          // 승리 패턴(공식)에 해당하는 말판에 색칠 공부하기!!
          const [x, y, z] = winner.condition;
          if (index === x || index === y || index === z) {
            winnerClasses = 'outline-2 outline-indigo-500 bg-indigo-500/30';
          }
        }

        return (
          <Cell key={index} index={index} className={winnerClasses}>
            {cell}
          </Cell>
        );
      })}
    </div>
  );
}

export default Grid;
