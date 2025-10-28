import { useState } from "react";

export default function GameSetup({ onGameSetup }) {
  const [selectedSymbol, setSelectedSymbol] = useState("X");

  const handleStart = (mode) => {
    onGameSetup(mode, selectedSymbol);
  };

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="size-8 cell-x"></div>
            <div className="size-8 cell-o"></div>
          </div>
        </div>

        <div className="bg-primary-light rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-primary-silver text-base font-bold mb-6 text-center tracking-wide">
            PICK PLAYER 1'S MARK
          </h2>

          <div className="bg-primary-dark rounded-xl p-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedSymbol("X")}
                className={`h-16 rounded-lg transition-all duration-200 ${
                  selectedSymbol === "X"
                    ? "bg-primary-silver"
                    : "bg-transparent hover:bg-primary-light"
                }`}
              >
                <div
                  className={`size-8 mx-auto ${
                    selectedSymbol === "X" ? "cell-x" : "cell-x-outline"
                  }`}
                ></div>
              </button>

              <button
                onClick={() => setSelectedSymbol("O")}
                className={`h-16 rounded-lg transition-all duration-200 ${
                  selectedSymbol === "O"
                    ? "bg-primary-silver"
                    : "bg-transparent hover:bg-primary-light"
                }`}
              >
                <div
                  className={`size-8 mx-auto ${
                    selectedSymbol === "O" ? "cell-o" : "cell-o-outline"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          <p className="text-primary-silver text-sm text-center opacity-75">
            X GOES FIRST
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleStart("solo")}
            className="w-full bg-primary-orange text-primary-dark font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-lg tracking-wide"
          >
            NEW GAME (VS CPU)
          </button>
          <button
            onClick={() => handleStart("multiplayer")}
            className="w-full bg-primary-teal text-primary-dark font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-lg tracking-wide"
          >
            NEW GAME (VS PLAYER)
          </button>
        </div>
      </div>
    </div>
  );
}