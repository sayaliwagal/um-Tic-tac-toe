🎮 Tic-Tac-Toe Game
 
A modern two-player Tic-Tac-Toe game built using React.js and Tailwind CSS.
This project showcases interactive gameplay, responsive design, and clean component-based architecture.

 [Live Demo Available Here!](https://umtictactoe.netlify.app/)

🚀 Tech Stack
Category	Technologies
Frontend Framework	⚛️ React.js
Styling	🎨 Tailwind CSS
State Management	React Hooks (useState, useEffect, Custom Hooks)
Build Tool	Vite
Deployment	Netlify / Vercel
🧾 Project Description

The Tic-Tac-Toe Game is a browser-based implementation of the classic 3x3 board game where two players — X and O — take turns to mark spaces on the grid.
The first player to align three symbols in a row, column, or diagonal wins.
If all cells are filled without a winner, the game ends in a tie.

🎯 Key Features

✅ Interactive 3x3 game board with dynamic updates
✅ Turn-based play between Player X and Player O
✅ Real-time winner and tie detection
✅ Restart/New Game button for replay
✅ Fully responsive design (mobile + desktop)
✅ Clean animations and smooth transitions

🧠 Game Logic Overview

Maintains state for board, current player, and game result using React hooks.

Checks all winning combinations (rows, columns, diagonals).

Disables further moves after a win or tie.

Stores and manages scores persistently using a custom local storage hook.

🗂️ Folder Structure
um-Tic-tac-toe/
my-project/
│
├── public/
├── index.html
│
├── src/
│ ├── Components/
│ │ ├── GameBoard.jsx
│ │ ├── GameSetup.jsx
│ │ └── WinMode.jsx
│ ├── utils/
│ │ ├── useLocalStorage.jsx
│ │ └── useGameLogic.jsx
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
│
├── package.json
├── tailwind.config.js
└── README.md


🖥️ How to Run Locally
# 1️⃣ Clone the repository
git clone https://github.com/sayaliwagal/um-Tic-tac-toe.git

# 2️⃣ Navigate into the project directory
cd um-Tic-tac-toe

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev


Your app will now be available at http://localhost:5173/
 🎉

📱 Responsiveness

Styled with Tailwind’s responsive utilities for seamless adaptability.

Works perfectly on both mobile and desktop screens.

🧪 Evaluation Criteria
Criteria	Description
Functionality	Game logic, turn handling, and win/tie detection
UI/UX	Clean, modern, and responsive design
Code Quality	Modular components, reusable logic, and clear structure
Performance	Smooth rendering with optimized state updates
🧑‍💻 Developer

Sayali Wagal
📧 sayaliwagal90@gmail.com

🔗 [GitHub](https://github.com/sayaliwagal)

💼 LinkedIn [LinkedIn](https://www.linkedin.com/in/sayali-wagal-521b3b1b0/)


	
	