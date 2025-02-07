// ----------------------------------------------
// 게임 진행을 위한 상수 및 함수
// ----------------------------------------------

export const enum PLAYER {
  ONE = '😎',
  TWO = '🤢',
}

export type Cell /* BoardPlayer */ = PLAYER | null;

export type Cells /* Board */ = Cell[];

/* const INITIAL_CELLS = [null, null, null, null, null, null, null, null, null]; */
export const INITIAL_CELLS: Cells = Array(9).fill(null);

// 다음 플레이어 반환 함수
export const getNextPlayer = (order: number) => {
  return order % 2 === 0 ? PLAYER.ONE : PLAYER.TWO;
};

// 게임 승리 조건
const WINNER_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 게임 진행 검사 -> 게임 위너 반환 함수
export type Winner = {
  player: PLAYER;
  condition: [number, number, number];
} | null;

export const getWinner = (cells: Cells) => {
  let winner = null;

  // 승리 조건 순환
  for (const [x, y, z] of WINNER_CONDITIONS) {
    const player = cells[x];
    // 승리 조건에 해당하는 위치에 말판이 일치하는 지 검사
    if (player && cells[y] === player && cells[z] === player) {
      winner = {
        player,
        condition: [x, y, z],
      };
      break;
    }
  }

  return winner as Winner;
};

// 게임 상태 메시지 반환 함수
export const getStatusMessage = (
  nextPlayer: PLAYER,
  winner: Winner,
  cells: Cells
) => {
  let statusMessage = `넥스트 플레이어 ${nextPlayer}`;

  if (winner) {
    statusMessage = `위너! ${winner.player}`;
  }

  const isDraw = !winner && cells.every(Boolean);

  if (isDraw) {
    statusMessage = '비겼습니다! 😵‍💫';
  }

  return statusMessage;
};
