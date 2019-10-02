import React from 'react';

export default function Square(props) {
    return (
        <button
            className={"square " + (props.curClick ? 'square-click' : '') + (props.isWin ? 'square-win' : '')}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}