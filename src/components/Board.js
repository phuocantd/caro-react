import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const { size } = this.props
        this.state = {
            squares: Array(size).fill(null)
                .map(() => Array(size).fill(null)),
            className: new Array(size).fill(null)
                .map(() => new Array(size).fill(null)
                    .map(() => ({ isDark: false, isWin: false, isList: false }))),
            xIsNext: true,
            status: 'Next player: X',
            isWinner: false,
            preRowDark: { x: 0, y: 0 },
            history: [],
            isForward: true,
            stepCurrent: -1
        };
        this.checkRow = this.checkRow.bind(this)
        this.checkCol = this.checkCol.bind(this)
        this.checkSlash = this.checkSlash.bind(this)
        this.checkBackSlash = this.checkBackSlash.bind(this)
        this.checkWinner = this.checkWinner.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.reverseArray = this.reverseArray.bind(this)
        this.renderSquare = this.renderSquare.bind(this)
        this.getArray = this.getArray.bind(this)
        this.resetGame = this.resetGame.bind(this)
        this.clickList = this.clickList.bind(this)
    }

    checkRow(i) {
        let block = 0;
        let count = 1;
        let row = Math.floor(i / this.props.size), col = i % this.props.size;
        const squares = this.state.squares.slice();
        let k = col + 1;
        if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
            block++;
        }
        while (squares[row][k] === squares[row][col] && k < this.props.size) {
            count = count + 1;
            k++;
            if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
                block++;
                break;
            }
        }
        k = col - 1;
        if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
            block++;
        }
        while (squares[row][k] === squares[row][col] && k >= 0) {
            count = count + 1;
            k--;
            if (squares[row][k] !== squares[row][col] && squares[row][k] !== null) {
                block++;
                break;
            }
        }
        if (block < 2 && count === 5) {
            return { player: squares[row][col], type: 0 };
        }
        return null;
    }
    checkCol(i) {
        let block = 0;
        let count = 1;
        let row = Math.floor(i / this.props.size), col = i % this.props.size;
        const squares = this.state.squares.slice();
        let k = row + 1;
        if (k < this.props.size && squares[k][col] !== squares[row][col] && squares[k][col] !== null) {
            block++;
        }
        while (k < this.props.size && squares[k][col] === squares[row][col]) {
            count = count + 1;
            k++;
            if (k < this.props.size && squares[k][col] !== squares[row][col] && squares[k][col] !== null) {
                block++;
                break;
            }
        }
        k = row - 1;
        if (k >= 0 && squares[k][col] !== squares[row][col] && squares[k][col] !== null) {
            block++;
        }
        while (k >= 0 && squares[k][col] === squares[row][col]) {
            count = count + 1;
            k--;
            if (k >= 0 && squares[k][col] !== squares[row][col] && squares[k][col] !== null) {
                block++;
                break;
            }
        }
        if (block < 2 && count === 5) {
            return { player: squares[row][col], type: 1 };
        }
        return null;
    }
    checkSlash(i) {
        let block = 0;
        let count = 1;
        let row = Math.floor(i / this.props.size), col = i % this.props.size;
        const squares = this.state.squares.slice();
        let r = row - 1, c = col + 1;
        if (r >= 0 && c < this.props.size && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
            block++;
        }
        while (r >= 0 && c < this.props.size && squares[r][c] === squares[row][col]) {
            count = count + 1;
            r--; c++;
            if (r >= 0 && c < this.props.size && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
                block++;
                break;
            }
        }
        r = row + 1; c = col - 1;
        if (r < this.props.size && c >= 0 && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
            block++;
        }
        while (r < this.props.size && c >= 0 && squares[r][c] === squares[row][col]) {
            count = count + 1;
            r++; c--;
            if (r < this.props.size && c >= 0 && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
                block++;
                break;
            }
        }
        if (block < 2 && count === 5) {
            return { player: squares[row][col], type: 2 };
        }
        return null;
    }
    checkBackSlash(i) {
        let block = 0;
        let count = 1;
        let row = Math.floor(i / this.props.size), col = i % this.props.size;
        const squares = this.state.squares.slice();
        let r = row - 1, c = col - 1;
        if (r >= 0 && c >= 0 && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
            block++;
        }
        while (r >= 0 && c >= 0 && squares[r][c] === squares[row][col]) {
            count = count + 1;
            r--; c--;
            if (r >= 0 && c >= 0 && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
                block++;
                break;
            }
        }
        r = row + 1; c = col + 1;
        if (r < this.props.size && c < this.props.size && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
            block++;
        }
        while (r < this.props.size && c < this.props.size && squares[r][c] === squares[row][col]) {
            count = count + 1;
            r++; c++;
            if (r < this.props.size && c < this.props.size && squares[r][c] !== squares[row][col] && squares[r][c] !== null) {
                block++;
                break;
            }
        }
        if (block < 2 && count === 5) {
            return { player: squares[row][col], type: 3 };
        }
        return null;
    }
    checkWinner(i) {
        let isWin = this.checkRow(i);
        if (isWin !== null) {
            return isWin;
        }
        isWin = this.checkCol(i);
        if (isWin !== null) {
            return isWin;
        }
        isWin = this.checkSlash(i);
        if (isWin !== null) {
            return isWin;
        }
        isWin = this.checkBackSlash(i);
        if (isWin !== null) {
            return isWin;
        }
        return null
    }

    handleClick(i) {
        let row = Math.floor(i / this.props.size), col = i % this.props.size, k = 0, r = 0, c = 0;
        const squares = this.state.squares.slice();
        const className = this.state.className.slice();
        const history = this.state.history.slice();
        const { preRowDark, stepCurrent } = this.state;
        let item = null;

        if (squares[row][col] || this.state.isWinner) {
            return;
        }


        if (this.state.isForward) {
            while (stepCurrent + 1 < history.length) {
                item = history.pop()
                squares[item.x][item.y] = false
            }
        } else {
            for (let k = 0; k < stepCurrent; k++) {
                item = history.shift()
                squares[item.x][item.y] = false
            }
        }

        if (this.state.isForward) {
            history.push({ x: row, y: col, player: (this.state.xIsNext ? 'X' : 'O') })
            this.clickList(this.state.stepCurrent + 1)
        } else {
            history.unshift({ x: row, y: col, player: (this.state.xIsNext ? 'X' : 'O') })
            this.clickList(0)
        }
        this.setState({
            history: [...history],
            //stepCurrent: this.state.stepCurrent + 1
        })


        className[preRowDark.x][preRowDark.y].isDark = false
        className[row][col].isDark = true;

        squares[row][col] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: [...squares],
            xIsNext: !this.state.xIsNext,
        });
        const winner = this.checkWinner(i);
        if (winner) {
            className[row][col].isDark = false;
            this.setState({
                status: 'Winner: ' + winner.player,
                isWinner: true
            })
            className[row][col].isWin = true;
            switch (winner.type) {
                case 0:
                    k = col - 1;
                    while (squares[row][k] === squares[row][col] && k < this.props.size) {
                        className[row][k].isWin = true;
                        k++;
                    }
                    k = col - 1;
                    while (squares[row][k] === squares[row][col] && k >= 0) {
                        className[row][k].isWin = true;
                        k--;
                    }
                    break;
                case 1:
                    k = row + 1;
                    while (k < this.props.size && squares[k][col] === squares[row][col]) {
                        className[k][col].isWin = true;
                        k++;
                    }
                    k = row - 1;
                    while (k >= 0 && squares[k][col] === squares[row][col]) {
                        className[k][col].isWin = true;
                        k--;
                    }
                    break;
                case 2:
                    r = row - 1; c = col + 1;
                    while (r >= 0 && c < this.props.size && squares[r][c] === squares[row][col]) {
                        className[r][c].isWin = true;
                        r--; c++;
                    }
                    r = row + 1; c = col - 1;
                    while (r < this.props.size && c >= 0 && squares[r][c] === squares[row][col]) {
                        className[r][c].isWin = true;
                        r++; c--;
                    }
                    break;
                case 3:
                    r = row - 1; c = col - 1;
                    while (r >= 0 && c >= 0 && squares[r][c] === squares[row][col]) {
                        className[r][c].isWin = true;
                        r--; c--;
                    }
                    r = row + 1; c = col + 1;
                    while (r < this.props.size && c < this.props.size && squares[r][c] === squares[row][col]) {
                        className[r][c].isWin = true;
                        r++; c++;
                    }
                    break;
                default:
                    break;
            }
        } else {
            this.setState({
                status: 'Next player: ' + (this.state.xIsNext ? 'O' : 'X'),
                className: [...className],
                preRowDark: { x: row, y: col }
            })
        }
    }

    reverseArray = () => {
        const history = this.state.history.slice();
        history.reverse();
        this.setState({
            history: [...history],
            isForward: !this.state.isForward
        })
        if(this.state.isForward){
            this.clickList(0)
        }
        else{
            this.clickList(this.state.history.length-1)
        }
    }

    renderSquare(i) {
        let row = Math.floor(i / this.props.size);
        let col = i % this.props.size;
        const { squares, className } = this.state;
        return (
            <Square
                value={squares[row][col]}
                onClick={() => this.handleClick(i)}
                key={i}
                curClick={className[row][col].isDark}
                isWin={className[row][col].isWin}
            />
        );
    }

    getArray(number) {
        let count = 0;
        let arr = [];
        let arrTmp = [];

        arrTmp.push(
            <button className={"square"} key={0}>
                {}
            </button>
        )
        for (let i = 0; i < number; i++) {
            arrTmp.push(
                <button className={"square"} key={i + 1}>
                    {String.fromCharCode(i + 65)}
                </button>
            )
        }
        arr.push(arrTmp)

        for (let i = 0; i < number; i++) {
            arrTmp = []
            arrTmp.push(
                <button className={"square"} key={-1}>
                    {i + 1}
                </button>
            )
            for (let j = 0; j < number; j++) {
                arrTmp.push(this.renderSquare(count))
                count++;
            }
            arr.push(<div className="board-row" key={i}>{arrTmp}</div>)
        }

        return arr;
    }

    resetGame() {
        let { size } = this.props
        this.setState({
            squares: Array(size).fill(null)
                .map(() => Array(size).fill(null)),
            className: new Array(size).fill(null)
                .map(() => new Array(size).fill(null)
                    .map(() => ({ isDark: false, isWin: false, isList: false }))),
            xIsNext: true,
            status: 'Next player: X',
            isWinner: false,
            preRowDark: { x: 0, y: 0 },
            history: [],
            stepCurrent: -1
        })
    }

    clickList(idx) {
        const { stepCurrent } = this.state;
        const className = this.state.className.slice();
        let row = Math.floor(stepCurrent / this.props.size), col = stepCurrent % this.props.size;
        if (stepCurrent >= 0) {
            className[row][col].isList = false;
        }
        row = Math.floor(idx / this.props.size); col = idx % this.props.size;
        className[row][col].isList = true;
        this.setState({
            stepCurrent: idx,
            className: [...className]
        })
    }

    render() {
        const { size } = this.props;
        return (
            <div className="game">
                <div className="game-board">
                    <button className="btn-reset" type="button" onClick={() => this.resetGame()}>Reset</button>
                    <div className="status">
                        {this.state.status}
                    </div>

                    {this.getArray(this.props.size)}
                </div>
                <div className="game-info">
                    <button
                        className={'btn-history'}
                        onClick={this.reverseArray}
                    >
                        History
                    </button>
                    {this.state.history.map((item, idx) => {
                        return (
                            <ol key={item.x * size + item.y}>
                                <button
                                    className={'btn-list ' + (this.state.className[Math.floor(idx / size)][idx % size].isList ? 'btn-list-clicked' : '')}
                                    onClick={() => this.clickList(idx)}
                                >
                                    <span>
                                        {`Player ${item.player}: [${item.x + 1}, ${String.fromCharCode(item.y + 65)}]`}
                                    </span>
                                </button>
                            </ol>
                        )
                    })}
                </div>
            </div>
        );
    }
}
