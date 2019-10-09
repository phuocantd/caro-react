import {
  HANDLE_CLICK,
  CLICK_LIST,
  RESET_GAME,
  REVERSE_ARRAY
} from "../actions";

const size = 20;
const initialState = {
  square: Array(size)
    .fill(null)
    .map(() => Array(size).fill(null)),
  classNames: new Array(size)
    .fill(null)
    .map(() =>
      new Array(size)
        .fill(null)
        .map(() => ({ isDark: false, isWin: false, isList: false }))
    ),
  xIsNext: true,
  status: "Next player: X",
  isWinner: false,
  preRowDark: { x: 0, y: 0 },
  historys: [],
  isForward: true,
  stepCurrent: 0
};

const checkRow = (i, square) => {
  const SIZE = 20;
  let block = 0;
  let count = 1;
  const row = Math.floor(i / SIZE);
  const col = i % SIZE;
  const squares = JSON.parse(JSON.stringify(square));
  let k = col + 1;

  if (squares[row][k] !== null && squares[row][k] !== squares[row][col]) {
    block += 1;
  }
  while (squares[row][k] === squares[row][col] && k < SIZE) {
    count += 1;
    k += 1;
    if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
      block += 1;
      break;
    }
  }
  k = col - 1;
  if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
    block += 1;
  }
  while (squares[row][k] === squares[row][col] && k >= 0) {
    count += 1;
    k -= 1;
    if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
      block += 1;
      break;
    }
  }
  if (block < 2 && count === 5) {
    return { player: squares[row][col], type: 0 };
  }
  return null;
};

const checkCol = (i, square) => {
  const SIZE = 20;
  let block = 0;
  let count = 1;
  const row = Math.floor(i / SIZE);
  const col = i % SIZE;
  const squares = JSON.parse(JSON.stringify(square));
  let k = row + 1;
  if (
    k < SIZE &&
    squares[k][col] !== squares[row][col] &&
    squares[k][col] !== null
  ) {
    block += 1;
  }
  while (k < SIZE && squares[k][col] === squares[row][col]) {
    count += 1;
    k += 1;
    if (
      k < SIZE &&
      squares[k][col] !== squares[row][col] &&
      squares[k][col] !== null
    ) {
      block += 1;
      break;
    }
  }
  k = row - 1;
  if (
    k >= 0 &&
    squares[k][col] !== squares[row][col] &&
    squares[k][col] !== null
  ) {
    block += 1;
  }
  while (k >= 0 && squares[k][col] === squares[row][col]) {
    count += 1;
    k -= 1;
    if (
      k >= 0 &&
      squares[k][col] !== squares[row][col] &&
      squares[k][col] !== null
    ) {
      block += 1;
      break;
    }
  }
  if (block < 2 && count === 5) {
    return { player: squares[row][col], type: 1 };
  }
  return null;
};

const checkSlash = (i, square) => {
  const SIZE = 20;
  let block = 0;
  let count = 1;
  const row = Math.floor(i / SIZE);
  const col = i % SIZE;
  const squares = JSON.parse(JSON.stringify(square));
  let r = row - 1;
  let c = col + 1;
  if (
    r >= 0 &&
    c < SIZE &&
    squares[r][c] !== squares[row][col] &&
    squares[r][c] !== null
  ) {
    block += 1;
  }
  while (r >= 0 && c < SIZE && squares[r][c] === squares[row][col]) {
    count += 1;
    r -= 1;
    c += 1;
    if (
      r >= 0 &&
      c < SIZE &&
      squares[r][c] !== squares[row][col] &&
      squares[r][c] !== null
    ) {
      block += 1;
      break;
    }
  }
  r = row + 1;
  c = col - 1;
  if (
    r < SIZE &&
    c >= 0 &&
    squares[r][c] !== squares[row][col] &&
    squares[r][c] !== null
  ) {
    block += 1;
  }
  while (r < SIZE && c >= 0 && squares[r][c] === squares[row][col]) {
    count += 1;
    r += 1;
    c -= 1;
    if (
      r < SIZE &&
      c >= 0 &&
      squares[r][c] !== squares[row][col] &&
      squares[r][c] !== null
    ) {
      block += 1;
      break;
    }
  }
  if (block < 2 && count === 5) {
    return { player: squares[row][col], type: 2 };
  }
  return null;
};

const checkBackSlash = (i, square) => {
  const SIZE = 20;
  let block = 0;
  let count = 1;
  const row = Math.floor(i / SIZE);
  const col = i % SIZE;
  const squares = JSON.parse(JSON.stringify(square));
  let r = row - 1;
  let c = col - 1;
  if (
    r >= 0 &&
    c >= 0 &&
    squares[r][c] !== squares[row][col] &&
    squares[r][c] !== null
  ) {
    block += 1;
  }
  while (r >= 0 && c >= 0 && squares[r][c] === squares[row][col]) {
    count += 1;
    r -= 1;
    c -= 1;
    if (
      r >= 0 &&
      c >= 0 &&
      squares[r][c] !== squares[row][col] &&
      squares[r][c] !== null
    ) {
      block += 1;
      break;
    }
  }
  r = row + 1;
  c = col + 1;
  if (
    r < SIZE &&
    c < SIZE &&
    squares[r][c] !== squares[row][col] &&
    squares[r][c] !== null
  ) {
    block += 1;
  }
  while (r < SIZE && c < SIZE && squares[r][c] === squares[row][col]) {
    count += 1;
    r += 1;
    c += 1;
    if (
      r < SIZE &&
      c < SIZE &&
      squares[r][c] !== squares[row][col] &&
      squares[r][c] !== null
    ) {
      block += 1;
      break;
    }
  }
  if (block < 2 && count === 5) {
    return { player: squares[row][col], type: 3 };
  }
  return null;
};

const checkWinner = (i, square) => {
  let isWin = checkRow(i, square);
  if (isWin !== null) {
    return isWin;
  }
  isWin = checkCol(i);
  if (isWin !== null) {
    return isWin;
  }
  isWin = checkSlash(i);
  if (isWin !== null) {
    return isWin;
  }
  isWin = checkBackSlash(i);
  if (isWin !== null) {
    return isWin;
  }
  return null;
};

// const clickList = idx => {
//   const {
//     caro: { stepCurrent, historys, classNames }
//   } = this.props;
//   const SIZE = 20;
//   const className = classNames.slice();
//   if (historys.length === 0) {
//     return;
//   }
//   let row = Math.floor(stepCurrent / SIZE);
//   let col = stepCurrent % SIZE;
//   if (stepCurrent >= 0) {
//     className[row][col].isList = false;
//   }
//   row = Math.floor(idx / SIZE);
//   col = idx % SIZE;
//   className[row][col].isList = true;
//   this.setState({
//     stepCurrent: idx,
//     classNames: [...className]
//   });
// };

function caroReducer(state = initialState, action) {
  const SIZE = 20;
  const caro = JSON.parse(JSON.stringify(state));
  let row;
  let col;
  let k = 0;
  let r = 0;
  let c = 0;
  let squares;
  let className;
  let history;
  let item;
  let winner;
  let idx;

  switch (action.type) {
    case HANDLE_CLICK:
      k = 0;
      r = 0;
      c = 0;
      squares = JSON.parse(JSON.stringify(caro.square));
      className = JSON.parse(JSON.stringify(caro.classNames));
      history = caro.historys.slice();
      item = null;
      col = action.i % SIZE;
      row = Math.floor(action.i / SIZE);
      if (squares[row][col] || caro.isWinner) {
        return state;
      }

      if (caro.isForward) {
        while (caro.stepCurrent + 1 < history.length) {
          item = history.pop();
          squares[item.x][item.y] = false;
        }
      } else {
        for (let t = 0; t < caro.stepCurrent; t += 1) {
          item = history.shift();
          squares[item.x][item.y] = false;
        }
      }

      if (caro.isForward) {
        history.push({ x: row, y: col, player: caro.xIsNext ? "X" : "O" });
        idx = caro.stepCurrent + 1;
        className = JSON.parse(JSON.stringify(caro.classNames));
        if (caro.historys.length !== 0) {
          row = Math.floor(caro.stepCurrent / SIZE);
          col = caro.stepCurrent % SIZE;
          if (caro.stepCurrent >= 0) {
            className[row][col].isList = false;
          }
          row = Math.floor(idx / SIZE);
          col = idx % SIZE;
          className[row][col].isList = true;
          caro.stepCurrent = idx;
          caro.classNames = [...className];
        }
      } else {
        history.unshift({
          x: row,
          y: col,
          player: caro.xIsNext ? "X" : "O"
        });
        idx = 0;
        className = JSON.parse(JSON.stringify(caro.classNames));
        if (caro.historys.length !== 0) {
          row = Math.floor(caro.stepCurrent / SIZE);
          col = caro.stepCurrent % SIZE;
          if (caro.stepCurrent >= 0) {
            className[row][col].isList = false;
          }
          row = Math.floor(idx / SIZE);
          col = idx % SIZE;
          className[row][col].isList = true;
          caro.stepCurrent = idx;
          caro.classNames = [...className];
        }
      }
      caro.historys = [...history];

      className[caro.preRowDark.x][caro.preRowDark.y].isDark = false;
      className[row][col].isDark = true;

      squares[row][col] = caro.xIsNext ? "X" : "O";
      caro.square = [...squares];
      caro.xIsNext = !caro.xIsNext;
      winner = checkWinner(action.i, caro.square);
      if (winner) {
        className[row][col].isDark = false;
        caro.status = `Winner: ${winner.player}`;
        caro.isWinner = true;
        className[row][col].isWin = true;
        switch (winner.type) {
          case 0:
            k = col - 1;
            while (squares[row][k] === squares[row][col] && k < SIZE) {
              className[row][k].isWin = true;
              k += 1;
            }
            k = col - 1;
            while (squares[row][k] === squares[row][col] && k >= 0) {
              className[row][k].isWin = true;
              k -= 1;
            }
            break;
          case 1:
            k = row + 1;
            while (k < SIZE && squares[k][col] === squares[row][col]) {
              className[k][col].isWin = true;
              k += 1;
            }
            k = row - 1;
            while (k >= 0 && squares[k][col] === squares[row][col]) {
              className[k][col].isWin = true;
              k -= 1;
            }
            break;
          case 2:
            r = row - 1;
            c = col + 1;
            while (r >= 0 && c < SIZE && squares[r][c] === squares[row][col]) {
              className[r][c].isWin = true;
              r -= 1;
              c += 1;
            }
            r = row + 1;
            c = col - 1;
            while (r < SIZE && c >= 0 && squares[r][c] === squares[row][col]) {
              className[r][c].isWin = true;
              r += 1;
              c -= 1;
            }
            break;
          case 3:
            r = row - 1;
            c = col - 1;
            while (r >= 0 && c >= 0 && squares[r][c] === squares[row][col]) {
              className[r][c].isWin = true;
              r -= 1;
              c -= 1;
            }
            r = row + 1;
            c = col + 1;
            while (
              r < SIZE &&
              c < SIZE &&
              squares[r][c] === squares[row][col]
            ) {
              className[r][c].isWin = true;
              r += 1;
              c += 1;
            }
            break;
          default:
            break;
        }
      } else {
        caro.status = `Next player: ${caro.xIsNext ? "O" : "X"}`;
        caro.classNames = [...className];
        caro.preRowDark = { x: row, y: col };
      }

      return caro;
    case CLICK_LIST:
      idx = action.i;
      className = caro.classNames.slice();
      if (caro.historys.length === 0) {
        return state;
      }
      row = Math.floor(caro.stepCurrent / SIZE);
      col = caro.stepCurrent % SIZE;
      if (caro.stepCurrent >= 0) {
        className[row][col].isList = false;
      }
      row = Math.floor(idx / SIZE);
      col = idx % SIZE;
      className[row][col].isList = true;
      caro.stepCurrent = idx;
      caro.classNames = [...className];
      return caro;
    case RESET_GAME:
      caro.square = Array(SIZE)
        .fill(null)
        .map(() => Array(SIZE).fill(null));
      caro.classNames = new Array(SIZE)
        .fill(null)
        .map(() =>
          new Array(SIZE)
            .fill(null)
            .map(() => ({ isDark: false, isWin: false, isList: false }))
        );
      caro.xIsNext = true;
      caro.status = "Next player: X";
      caro.isWinner = false;
      caro.preRowDark = { x: 0, y: 0 };
      caro.historys = [];
      caro.stepCurrent = 0;
      return caro;
    case REVERSE_ARRAY:
      history = caro.historys.slice();
      caro.historys.reverse();
      caro.historys = [...history];
      caro.isForward = !state.isForward;
      if (caro.isForward) {
        this.clickList(0);
      } else {
        this.clickList(history.length - 1);
      }
      return caro;
    default:
      return state;
  }
}

export default caroReducer;
