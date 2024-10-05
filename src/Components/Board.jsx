import { useState } from 'react'

const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button
        className='border-4 border-gray-300  m-2 text-3xl h-24 w-24 leading-9'
        onClick={onSquareClick}
      >
        {value}
      </button>
    </>
  )
}

const Board = () => {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i) => {

   if(squares[i]){
    return;
   }

    const nextSquare = squares.slice();
    if(xIsNext){
        nextSquare[i]="X";
    }
    else{
        nextSquare[i]="O"
    }
    setSquare(nextSquare);
    setXIsNext(!xIsNext);
  }
  return (
    <>
      <div className='flex'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      
      <div className='flex'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      
      <div className='flex'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      
    </>
  )
}

export default Board
