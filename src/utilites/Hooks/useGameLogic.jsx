import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals;
];

export const useGameLogic = (gameMode, playerSymbol) => {
  const [board, setBoard] = useLocalStorage(
    "tic-tac-tie-board",
    Array(9).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useLocalStorage(
    "tic-tac-toe-player",
    "X"
  );

  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing");

  const cpuSymbol = playerSymbol === "X" ? "O" : "X";

  useEffect(() => {
    const checkWinner = () => {
      for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          setWinningLine(combination);
          setGameStatus("won");
          return;
        }
      }

      // Tie
      if (board.every((cell) => cell !== null)) {
        setGameStatus("tie");
        return;
      }

      setWinner(null);
      setWinningLine(null);
      setGameStatus("playing");
    };

    checkWinner();
  }, [board]);

  const makeMove = useCallback(
    (index) => {
      if (board[index] !== null || gameStatus !== "playing") return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    },
    [board, gameStatus, currentPlayer, setBoard, setCurrentPlayer]
  );

  // AI moves
  useEffect(() => {
    if (
      gameMode === "solo" &&
      currentPlayer === cpuSymbol &&
      gameStatus === "playing"
    ) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board, cpuSymbol, playerSymbol);

        if (bestMove !== -1) {
          makeMove(bestMove);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    currentPlayer,
    gameMode,
    gameStatus,
    board,
    cpuSymbol,
    playerSymbol,
    makeMove,
  ]);

  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
    setGameStatus("playing");
  };

  const restartGame = () => {
    if (window.confirm("Are you sure you want to restart the game")) {
      resetGame();
    }
  };

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameStatus,
    makeMove,
    resetGame,
    restartGame,
  };
};

const getBestMove = (board, aiSymbol, humanSymbol) => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (availableMoves.length === 0) return -1;

  // First move optimization - take center or corner
  if (availableMoves.length === 9) {
    return Math.random() < 0.8
      ? 4
      : [0, 2, 6, 8][Math.floor(Math.random() * 4)];
  }

  // Check for immediate win
  for (let move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = aiSymbol;
    if (checkWinner(testBoard) === aiSymbol) {
      return move;
    }
  }

  // Check for blocking human win
  for (let move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = humanSymbol;
    if (checkWinner(testBoard) === humanSymbol) {
      return move;
    }
  }

  // Use minimax for optimal move
  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (let move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = aiSymbol;
    const score = minimax(
      testBoard,
      0,
      false,
      aiSymbol,
      humanSymbol,
      -Infinity,
      Infinity
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

const minimax = (
  board,
  depth,
  isMaximizing,
  aiSymbol,
  humanSymbol,
  alpha,
  beta
) => {
  const winner = checkWinner(board);

  if (winner === aiSymbol) return 10 - depth;
  if (winner === humanSymbol) return depth - 10;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        const score = minimax(
          board,
          depth + 1,
          false,
          aiSymbol,
          humanSymbol,
          alpha,
          beta
        );
        board[i] = null;
        maxScore = Math.max(score, maxScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }

    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanSymbol;
        const score = minimax(
          board,
          depth + 1,
          true,
          aiSymbol,
          humanSymbol,
          alpha,
          beta
        );
        board[i] = null;
        minScore = Math.min(score, minScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }

    return minScore;
  }
};

const checkWinner = (board) => {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};