import React, { useState } from 'react';
import './connect4.scss';
import ColorPicker from './ColorPicker';

interface SquareProps {

    value: number;
}

const Square: React.FC<SquareProps> = ({ value }) => {
    return (
        <button className="square" 
        style={{backgroundColor: value === 1 ? 'var(--player1Color)' : value === -1 ? 'var(--player2Color)' : ""}}>
        </button>
    )
}

interface ColumnProps {
    columnValues: number[];
    onClick: () => void;
}

const Column: React.FC<ColumnProps> = ({ columnValues, onClick}) => {
    return (
        <div className="column" onClick={onClick}>
        {columnValues.map((value, index) => (
        <Square key={index} value={value} />
    ))}
        </div>
    )
}

interface BoardProps {
    width: number;
    height: number;
}

function didSomeoneWin(board: number[][], width: number, height: number) {
    // Check horizontal
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width - 3; j++) {
            if (board[j][i] !== 0 && board[j][i] === board[j + 1][i] && board[j + 1][i] === board[j + 2][i] && board[j + 2][i] === board[j + 3][i]) {
                return true;
            }
        }
    }

    // Check vertical
    for (let i = 0; i < height - 3; i++) {
        for (let j = 0; j < width; j++) {
            if (board[j][i] !== 0 && board[j][i] === board[j][i + 1] && board[j][i + 1] === board[j][i + 2] && board[j][i + 2] === board[j][i + 3]) {
                return true;
            }
        }
    }

    // Check diagonals
    for (let i = 0; i < height - 3; i++) {
        for (let j = 0; j < width - 3; j++) {
            if (board[j][i] !== 0 && board[j][i] === board[j + 1][i + 1] && board[j + 1][i + 1] === board[j + 2][i + 2] && board[j + 2][i + 2] === board[j + 3][i + 3]) {
                return true;
            }
            if (board[j][i + 3] !== 0 && board[j][i + 3] === board[j + 1][i + 2] && board[j + 1][i + 2] === board[j + 2][i + 1] && board[j + 2][i + 1] === board[j + 3][i]) {
                return true;
            }
        }
    }
}

const initBoard = (width: number, height: number) => {
   return Array.from({ length: width }, () => Array.from({ length: height }, () => 0));
}

const Board: React.FC<BoardProps> = ({ width, height }) => {
    // Player 1 is 1, Player 2 is -1 
    const [board, setBoard] = useState(initBoard(width, height));
    const [turn, setTurn] = useState(true);
    const [won, setWon] = useState(false);

    const handleClick = (index: number) => {
        if (won){
            return;
        }
        const newBoard = [...board]; // It is a shallow copy, but it seems to work
        for (let i = height - 1; i >= 0 ; i--) {
            if (newBoard[index][i] === 0) {
                newBoard[index][i] = turn ? 1 : -1;
                break;
            }
            // Column is full, don't do anything
            else if (i === 0){
                return;
            }
        }
        // Update state
        setBoard(newBoard);
        setTurn(!turn);

        if (didSomeoneWin(newBoard, width, height)) {
            //alert(`Player ${turn ? 1 : 2} won!`);
            setWon(true);
        }
    }

    return (
    <>
        {won && !turn ? <h2>Player 1 won!</h2> : won && turn ? <h2>Player 2 won!</h2> : null}
        {!won && turn ? <h2>Player 1's turn</h2> : !won && !turn ? <h2>Player 2's turn</h2> : null}
        <div className="board">
        {
        board.map((columnValues, index) => (
            <Column key={index}  columnValues={columnValues} onClick={() => handleClick(index)}/>
        ))
        }
        </div>
        <button className="reset" onClick={() => { setBoard(initBoard(width, height)); setTurn(true); setWon(false); }}>Reset</button>
    </>
    )
}

function App() {
  return (
    <div className="app">
        <h1>Connect4</h1>
        <Board width={7} height={5} />
        <ColorPicker />
    </div>
  );
}

export default App;
