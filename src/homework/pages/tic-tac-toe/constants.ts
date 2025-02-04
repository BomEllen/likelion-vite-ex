// ----------------------------------------------
// 게임 상수
// ----------------------------------------------

/* const INITIAL_CELLS = [null, null, null, null, null, null, null, null, null]; */
export const INITIAL_CELLS = Array(9).fill(null);

export const enum PLAYER {
  ONE = '😎',
  TWO = '🤢',
}

export type Cells = (PLAYER | null)[];
