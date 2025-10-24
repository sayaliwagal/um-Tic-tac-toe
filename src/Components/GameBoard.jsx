import React, { useState } from "react";

const GameBoard = ({
  board,
  currentPlayer,
  onCellClick,
  onRestart,
  gameMode,
  playerSymbol,
  scores,
  winningLine,
}) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] === null) {
      onCellClick(index);
    }
  };

  const handleCellHover = (index) => {
    if (board[index] === null) {
      setHoveredCell(index);
    }
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };
  const getCellClass = (index) => {
    let baseClass =
      "w-full aspect-square bg-primary-light rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center";
    if (winningLine && winningLine.includes(index)) {
      baseClass +=
        board[index] === "X" ? " bg-primary-teal" : " bg-primary-orange";
    }
    if (board[index]) {
      baseClass += board[index] === "X" ? " cell-x" : " cell-o";
    } else if (hoveredCell === index) {
      baseClass +=
        currentPlayer === "X" ? " cell-x-outline" : " cell-o-outline";
    }

    if (board[index] !== null) {
      baseClass += " cursor-default";
    }
    return baseClass;
  };

  const getPlayerLabel = (symbol) => {
    if (gameMode === "solo") {
      if (symbol === playerSymbol) {
        return "YOU";
      } else {
        return "CPU";
      }
    }
    return "PLAYER";
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="size-12 cell-x"></div>
          <div className="size-12 cell-o"></div>
        </div>
        <div className="bg-primary-light px-4 py-2 rounded-xl flex items-center space-x-2">
          <div
            className={`size-12 ${currentPlayer === "X" ? "cell-x" : "cell-o"}`}
          ></div>
          <span className="text-primary-silver text-sm font-bold tracking-wide">
            TO PLAY
          </span>
        </div>
        <button className="bg-primary-silver opacity-80 py-2 px-4 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105">
          Restart
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {board.map((cell, index) => {
          return (
            <div
              key={index}
              className={getCellClass(index)}
              onClick={() => handleCellClick(index)}
              onMouseEnter={() => handleCellHover(index)}
              onMouseLeave={handleCellLeave}
            >
              <div className="size-full animate-scale-in"></div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary-teal rounded-2xl p-4 text-center">
          <div className="text-primary-dark text-sm font-bold mb-1">
            X {getPlayerLabel("X")}
          </div>
          <div className="text-primary-dark text-2xl font-bold">{scores.X}</div>
        </div>
        <div className="bg-primary-silver rounded-2xl p-4 text-center">
          <div className="text-primary-dark text-sm font-bold mb-1">TIES</div>
          <div className="text-primary-dark text-2xl font-bold">
            {scores.ties}
          </div>
        </div>

        <div className="bg-primary-orange rounded-2xl p-4 text-center">
          <div className="text-primary-dark text-sm font-bold mb-1">
            O ({getPlayerLabel("O")})
          </div>
          <div className="text-primary-dark text-2xl font-bold">{scores.O}</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
