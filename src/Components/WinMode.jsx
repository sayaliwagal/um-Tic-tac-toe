import React from 'react'

const WinMode = ({ winner, gameStatus, gameMode, playerSymbol, onAction}) => {
 
  const getWinnerText = () => {

    if(gameStatus === "tie"){
      return "ROUND TIED"
    }
    if(gameMode === "solo"){
      if(winner === playerSymbol){
        return "YOU WON";
      }else {
        return "OH NO, YOU LOST...";
      }
    } else{
      return "PLAYER 1 WINS!";
    }
  }

  const getSubText = () => {
    if(gameStatus === "tie"){
      return "";
    }
    return "TAKES THE ROUND"
  }
   
  const getWinnerColor = () => {
    if(gameStatus === "tie"){
      return "text=primary-silver";
    }
    return winner === "X" ? "text-primary-teal" : "text-primary-orange";
  }
  
  const getWinnerIcon = () => {
    if(gameStatus === "tie"){
      return null;
    }
    return (
      <div className={`size-8 mr-4 ${winner === "X" ? "cell-x" : "cell-o"}`}></div>
    )
  }

  return (
    <div className='fixed insert-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in'>
      <div className="bg-primary-light rounded-2xl p-8 max-w-sm w-full mx-4 animte-slide-up">
        <div className="text-center">
          {gameMode === "solo" && gameStatus !== "tie" && (
            <p className='text=primary-silver text-sm font-bold mb-2 tracking-wide'>
              {getWinnerText()}
            </p>
          )}
          <div className="flex items-center justify-center mb-6 ">
            {getWinnerIcon()}
          </div>
          <h2 className={`text-2xl font-bold ${getWinnerColor()} tracking-wide`}>
            {gameStatus === "tie" ? getWinnerText() : winner}
          </h2>
          {getSubText() && (
            <p className={`text-lg font-bold ${getWinnerColor()}`}>
              {getSubText()}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        <button onClick={() => onAction("quit")}
          className='flex-1 bg-primary-silver text-primary-dark font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105'>QUIT</button>
        <button onClick={() => onAction("next")}
          className='flex-1 bg-primary-silver text-primary-dark font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105'>NEXT ROUND</button>
      </div>
    </div>
  )
}

export default WinMode
