import { useState } from 'react';

// Single square component
const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className='border-4 border-gray-300 m-2 text-3xl h-24 w-24 leading-9'
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

// Board component
const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); // State to track squares
  const [xIsNext, setXIsNext] = useState(true); // State to track current player
  const [winner, setWinner] = useState(null); // State to track winner

  // Handle click event on a square
  const handleClick = (i) => {
    // If the square is already filled or if there's a winner, return
    if (squares[i] || winner) {
      return;
    }

    // Copy current squares
    const nextSquares = squares.slice();

    // Set current square to the current player (X or O)
    nextSquares[i] = xIsNext ? 'X' : 'O';

    // Update state
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // Check for winner
    const checkForWinner = checkWinner(nextSquares);
    if (checkForWinner) {
      setWinner(checkForWinner);
    }
  };

  // Function to check the winner
  const checkWinner = (squares) => {
    // Possible winning combinations
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    // Iterate through each winning combination
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      // Check if the values in the squares are the same and not null
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return the winning symbol (X or O)
      }
    }

    return null; // No winner found
  };

  // Reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className='flex flex-col items-center bg-gradient-to-r from-indigo-400 to-green-200 py-20 font-bold container mx-auto '>
      {/* Game Status */}
      <h1 className='text-4xl pb-8 text-purple-500'>Tic-Tac-Toe</h1>
      <div className='mb-4 text-3xl'>
        {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>

      {/* Game Board */}
      <div className='flex flex-col'>
        <div className='flex'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='flex'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='flex'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Restart Game
      </button>
    </div>
  );
};

export default Board;
