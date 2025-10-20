import React, { useState } from 'react'

const GameBoard = ({board, currentPlayer, onCellClick, onRestart, gameMode, playerSymbol, scores, winningLine}) => {
  const [hoveredCell, setHoveredCell ] = useState(null);

  const handleCellClick = (index) => {
    if(board[index] === null){
      onCellClick(index);
    }
  }

  const handleCellHover = (index) => {
    if(board[index] === null){
      setHoveredCell(index);
    }
  }

const handleCellLeave = () => {
  setHoveredCell(null);
}

  return (
    <div>
      GameBoard
    </div>
  )
}

export default GameBoard
