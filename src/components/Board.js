import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  getArray = number => {
    let count = 0;
    const arr = [];
    let arrTmp = [];

    arrTmp.push(
      <button type="button" className="square" key={0}>
        {}
      </button>
    );
    for (let i = 0; i < number; i += 1) {
      arrTmp.push(
        <button type="button" className="square" key={i + 1}>
          {String.fromCharCode(i + 65)}
        </button>
      );
    }
    arr.push(arrTmp);

    for (let i = 0; i < number; i += 1) {
      arrTmp = [];
      arrTmp.push(
        <button type="button" className="square" key={-1}>
          {i + 1}
        </button>
      );
      for (let j = 0; j < number; j += 1) {
        arrTmp.push(this.renderSquare(count));
        count += 1;
      }
      arr.push(
        <div className="board-row" key={i}>
          {arrTmp}
        </div>
      );
    }

    return arr;
  };

  renderSquare = i => {
    const {
      caro: { square, classNames },
      handleClick
    } = this.props;
    const SIZE = 20;

    const row = Math.floor(i / SIZE);
    const col = i % SIZE;
    return (
      <Square
        value={square[row][col]}
        onClick={() => handleClick(i)}
        key={i}
        curClick={classNames[row][col].isDark}
        isWin={classNames[row][col].isWin}
      />
    );
  };

  render() {
    const SIZE = 20;
    const {
      caro: { status, historys, classNames },
      clickList,
      resetGame,
      reverseArray
    } = this.props;
    // console.log(historys)
    return (
      <div className="game">
        <div className="game-board">
          <button
            className="btn-reset"
            type="button"
            onClick={() => resetGame()}
          >
            Reset
          </button>
          <div className="status">{status}</div>
          {this.getArray(SIZE)}
        </div>
        <div className="game-info">
          <button type="button" className="btn-history" onClick={reverseArray}>
            History
          </button>
          {historys.map((item, idx) => {
            return (
              <ol key={item.x * SIZE + item.y}>
                <button
                  type="button"
                  className={`btn-list ${
                    classNames[Math.floor(idx / SIZE)][idx % SIZE].isList
                      ? "btn-list-clicked"
                      : ""
                  }`}
                  onClick={() => clickList(idx)}
                >
                  <span>
                    {`Player ${item.player}: [${item.x +
                      1}, ${String.fromCharCode(item.y + 65)}]`}
                  </span>
                </button>
              </ol>
            );
          })}
        </div>
      </div>
    );
  }
}
