import { useState } from 'react';
import { tm } from '@/utils/tw-merge';
import Board from './components/board';
import History from './components/history';
import {
  getNextPlayer,
  getStatusMessage,
  getWinner,
  INITIAL_CELLS,
  type Cells,
} from './constants';

function TicTacToe() {
  // [상태]
  // 게임 보드 셀(cells, 9개(3 x 3))
  const [gameHistory, setGameHistory] = useState<Cells[]>([INITIAL_CELLS]);

  // [상태]
  // 게임 순서(order)
  const [gameOrder, setGameOrder] = useState<number>(0);

  // [파생된 상태]
  // 현재 게임 보드판
  const currentCells = gameHistory[gameOrder];

  // [파생된 상태]
  // 다음 플레이어
  const nextPlayer = getNextPlayer(gameOrder);

  // [파생된 상태]
  // 게임 승자 정보
  const winner = getWinner(currentCells);

  // [파생된 상태]
  // 게임 상태 메시지
  const statusMessage = getStatusMessage(nextPlayer, winner, currentCells);

  // [이벤트 핸들러]
  // 게임 진행 함수
  const handlePlayGame = (index: number) => {
    // 승리자가 있다면 게임 오버(GAME OVER)
    if (winner) {
      // 알림(notification)
      alert(`GAME OVER!\nWinner ${winner.player}`);
      return;
    }

    // 게임 상태 업데이트 (순서)
    const nextGameOrder = gameOrder + 1;
    setGameOrder(nextGameOrder);

    // 게임 상태 업데이트 (게임 보드 셀)
    const nextCells = currentCells.map((cell, i) =>
      index !== i ? cell : nextPlayer
    );

    const nextGameHistory = [...gameHistory.slice(0, nextGameOrder), nextCells];

    setGameHistory(nextGameHistory);
  };

  // [이벤트 핸들러]
  // 게임 초기화 함수
  const handleReGame = () => {
    // 게임 운영에 사용되는 상태 초기화 (리셋, 리-게임)
    setGameHistory([INITIAL_CELLS]);
    setGameOrder(0);
  };

  // [이벤트 핸들러]
  // 타임 트레버(시간 여행)
  const handleTimeTravel = (travelIndex: number) => {
    setGameOrder(travelIndex);
  };

  return (
    <article className={tm('flex space-x-5 justify-center', 'mt-10')}>
      <h2 className="sr-only">틱택토 게임</h2>
      <Board
        cells={currentCells}
        winner={winner}
        statusMessage={statusMessage}
        onPlayGame={handlePlayGame}
        onReGame={handleReGame}
      />
      <History
        count={gameHistory.length}
        gameOrder={gameOrder}
        onTimeTravel={handleTimeTravel}
      />
    </article>
  );
}

export default TicTacToe;
