import { useState } from "react";

const Square = () => {
    const [value,setValue] = useState(null);

    
    const handleClick =() =>{
        setValue('X')
       
    }
   return <>
   <button  className='border-4 border-gray-300  m-2 text-3xl h-24 w-24 leading-9'
   onClick={handleClick}
   >{value}</button>
   </>
}

const Board = () => {
  return (
    <>
      <div className="flex">
       <Square />
       <Square />
       <Square />
      </div>
      <div className="flex">
       <Square />
       <Square />
       <Square />
      </div>
      <div className="flex">
       <Square />
       <Square />
       <Square />
      </div>
    </>
  )
}

export default Board
