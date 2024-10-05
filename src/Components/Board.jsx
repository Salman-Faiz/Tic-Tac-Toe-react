import { useState } from 'react'

// Single square component
const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className='border-4 border-white m-2 text-3xl h-24 w-24 leading-9'
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

// Board component
const Board = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]) // State to track all moves history
  const [currentMove, setCurrentMove] = useState(0) // State to track the current move index
  const [xIsNext, setXIsNext] = useState(true) // State to track current player
  const [winner, setWinner] = useState(null) // State to track the winner

  const currentSquares = history[currentMove] // Get the current board state

  // Handle click event on a square
  const handleClick = i => {
    // Check if there's already a value in the square or if the game has been won
    if (currentSquares[i] || winner) {
      return
    }

    // Copy current squares
    const nextSquares = currentSquares.slice()

    // Set the current square to the current player (X or O)
    nextSquares[i] = xIsNext ? 'X' : 'O'

    // Update history to include the new move
    const newHistory = history.slice(0, currentMove + 1)
    setHistory([...newHistory, nextSquares])
    setCurrentMove(newHistory.length) // Set the current move to the latest one
    setXIsNext(!xIsNext) // Toggle player

    // Check for winner
    const newWinner = checkWinner(nextSquares) // Correct variable name is `newWinner`
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  // Function to check the winner
  const checkWinner = squares => {
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
    ]

    // Iterate through each winning combination
    for (let combination of winningCombinations) {
      const [a, b, c] = combination

      // Check if the values in the squares are the same and not null
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a] // Return the winning symbol (X or O)
      }
    }

    return null // No winner found
  }

  // Navigate to a specific move
  const jumpTo = move => {
    setCurrentMove(move)
    setXIsNext(move % 2 === 0) // Determine whose turn it is based on move number
    setWinner(checkWinner(history[move])) // Update winner if necessary
  }

  // Reset the game
  const resetGame = () => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setXIsNext(true)
    setWinner(null)
  }

  // Generate move history buttons
  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : `Go to game start`
    return (
      <li key={move}>
        <button
          className='bg-gray-200 p-2 m-1 rounded hover:bg-gray-300'
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="mt-32 flex flex-col items-center  py-20 font-bold container mx-auto rounded-xl bg-[url('tic-tac.jpeg')]  " style={{borderRadius:'0px 300px 300px 300px'}}>
    <div className='flex flex-col items-center '>
      {/* Game Status */}
      <div className='mb-4 text-2xl bg-white px-6 py-4 border-4 border-black rounded-md font-extrabold'>
    
        {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>

      <div className='flex justify-center gap-5 bg-yellow-500 pt-5 pb-20 px-10 rounded-md'>
       
        {/* Game Board */}
        <div className="flex flex-col pt-5 text-black">
          <div className='flex'>
            <Square
              value={currentSquares[0]}
              onSquareClick={() => handleClick(0)}
            />
            <Square
              value={currentSquares[1]}
              onSquareClick={() => handleClick(1)}
            />
            <Square
              value={currentSquares[2]}
              onSquareClick={() => handleClick(2)}
            />
          </div>
          <div className='flex'>
            <Square
              value={currentSquares[3]}
              onSquareClick={() => handleClick(3)}
            />
            <Square
              value={currentSquares[4]}
              onSquareClick={() => handleClick(4)}
            />
            <Square
              value={currentSquares[5]}
              onSquareClick={() => handleClick(5)}
            />
          </div>
          <div className='flex'>
            <Square
              value={currentSquares[6]}
              onSquareClick={() => handleClick(6)}
            />
            <Square
              value={currentSquares[7]}
              onSquareClick={() => handleClick(7)}
            />
            <Square
              value={currentSquares[8]}
              onSquareClick={() => handleClick(8)}
            />
          </div>
           {/* Reset Button */}
     <button
        onClick={resetGame}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 '
      >
        Restart Game
      </button>
        </div>

        {/* History Section */}
        <div className='mt-4'>
          <h3 className='text-lg font-bold bg-white border-2 border-black text-center rounded-md'>Move History</h3>
          <ul>{moves}</ul>
        </div>
      </div>

     
    </div>
    
    </div>
  )
}

export default Board
