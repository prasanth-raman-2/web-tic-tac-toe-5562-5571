import React, { useState, useEffect } from 'react';
import './GameBoard.css';

// PUBLIC_INTERFACE
const GameBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  // Reset game when a winner is found
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        handleReset();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  // PUBLIC_INTERFACE
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every(square => square)) {
      return 'Game Draw!';
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game-board">
      <div className="status">{getStatus()}</div>
      <div className="board">
        {board.map((square, index) => (
          <button
            key={index}
            className={`square ${square} ${winningLine.includes(index) ? 'winner' : ''}`}
            onClick={() => handleClick(index)}
            aria-label={`Square ${index}`}
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
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}

export default GameBoard;
