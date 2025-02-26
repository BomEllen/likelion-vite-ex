import usePersist from '@/hooks/use-persist';
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
import Title from '@/components/title';
import {
  TicTacToeContext,
  type TicTacToeContextValue,
} from './contexts/tic-tac-toe';

function TicTacToeWithContext() {
  const { data: gameHistory, setData: setGameHistory } = usePersist<Cells[]>(
    '@tic-tac-toe/game-history',
    [INITIAL_CELLS]
  );

  const { data: gameOrder, setData: setGameOrder } = usePersist(
    '@tic-tac-toe/game-order',
    0
  );

  const currentCells = gameHistory![gameOrder!];

  const nextPlayer = getNextPlayer(gameOrder!);

  const winner = getWinner(currentCells);

  const statusMessage = getStatusMessage(nextPlayer, winner, currentCells);

  const handlePlayGame = (index: number) => {
    if (winner) {
      alert(`GAME OVER!\nWinner ${winner.player}`);
      return;
    }

    const nextGameOrder = gameOrder! + 1;
    setGameOrder(nextGameOrder);

    const nextCells = currentCells.map((cell, i) =>
      index !== i ? cell : nextPlayer
    );

    const nextGameHistory = [
      ...gameHistory!.slice(0, nextGameOrder),
      nextCells,
    ];

    setGameHistory(nextGameHistory);
  };

  const handleReGame = () => {
    setGameHistory([INITIAL_CELLS]);
    setGameOrder(0);
  };

  const handleTimeTravel = (travelIndex: number) => {
    setGameOrder(travelIndex);
  };

  // 틱택토 게임 컨텍스트 값
  const value = {
    gameHistory,
    setGameHistory,
    currentCells,
    gameOrder,
    setGameOrder,
    nextPlayer,
    winner,
    statusMessage,
    playGame: handlePlayGame,
    restartGame: handleReGame,
    jumpGame: handleTimeTravel,
  } satisfies TicTacToeContextValue;

  return (
    <>
      <Title>틱택토 게임 (with 시간여행 기능)</Title>
      <article className={tm('flex space-x-5 justify-center', 'mt-10')}>
        <h2 className="sr-only">틱택토 게임</h2>
        <TicTacToeContext.Provider value={value}>
          <Board />
          <History />
        </TicTacToeContext.Provider>
      </article>
    </>
  );
}

export default TicTacToeWithContext;
