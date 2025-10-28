import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameSetup from "./components/GameSetup";
import WinModal from "./components/WinModal";
import { useLocalStorage } from "./utilites/Hooks/useLocalStorage";
import { useGameLogic } from "./utilites/Hooks/useGameLogic";
import "./App.css";

export default function App() {
  const [gameMode, setGameMode] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [gameStarted, setGameStarted] = useState(true);

  const [scores, setScores] = useLocalStorage("ttt-scores", {
    X: 0,
    O: 0,
    ties: 0,
  });

  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameStatus,
    makeMove,
    resetGame,
    restartGame,
  } = useGameLogic(gameMode, playerSymbol);

  const handleGameSetup = (mode, symbol) => {
    setGameMode(mode);
    setPlayerSymbol(symbol);
    setGameStarted(true);
  };

  const handleWindModalAction = (action) => {
    if (action === "next") {
      if (winner) {
        setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
      } else if (gameStatus === "tie") {
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      }

      resetGame();
    } else if (action === "quit") {
      setGameStarted(false);
      setGameMode(null);
      resetGame();
    }
  };

  const handleRestart = () => {
    restartGame();
  };

  if (!gameStarted) {
    return <GameSetup onGameSetup={handleGameSetup} />;
  }

  return (
    <div className="min-h-screen bg-primary-dark font-outfit flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <GameBoard
          board={board}
          currentPlayer={currentPlayer}
          onCellClick={makeMove}
          onRestart={handleRestart}
          gameMode={gameMode}
          playerSymbol={playerSymbol}
          scores={scores}
          winningLine={winningLine}
        />

        {(winner || gameStatus === "tie") && (
          <WinModal
            winner={winner}
            gameStatus={gameStatus}
            gameMode={gameMode}
            playerSymbol={playerSymbol}
            onAction={handleWindModalAction}
          />
        )}
      </div>
    </div>
  );
}