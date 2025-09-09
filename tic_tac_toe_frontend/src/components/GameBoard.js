import React, { useState } from 'react';
import './GameBoard.css';

// PUBLIC_INTERFACE
const GameBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // PUBLIC_INTERFACE
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square) 
      ? 'Game Draw!' 
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, index) => (
          <button 
            key={index}
            className={`square ${square}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default GameBoard;
