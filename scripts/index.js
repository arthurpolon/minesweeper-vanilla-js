import { restartGame, startGame } from "./game.js";

const flagIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M4 24h-2v-24h2v24zm18-22h-16v12h16l-4-5.969 4-6.031z"/></svg>'

const boardElement = document.querySelector(".board");
const restartButtonElement = document.querySelector(".restart-button");
const remainingBombsElement = document.querySelector(".remaining-bombs");

const boardRowsInput = document.querySelector("#board-rows-input");
const boardColumnsInput = document.querySelector("#board-columns-input");
const bombsInput = document.querySelector("#bombs-input");

if (window.innerWidth < 580) {
  boardRowsInput.value = 10;
  boardColumnsInput.value = 6;
}

const state = {
  get remainingBombs() {
    return Number(remainingBombsElement.innerText);
  },
  set remainingBombs(value) {
    remainingBombsElement.innerText = value;
  },

  get boardSize() {
    const rows = Number(boardRowsInput.value);
    const columns = Number(boardColumnsInput.value);

    return {
      rows,
      columns,
    };
  },

  get numberOfBombs() {
    return Number(bombsInput.value);
  },
}

state.remainingBombs = state.numberOfBombs;

function onCellLeftClick(cell) {
  console.log("left click");

  if (!cell.isHidden) {
    return
  }

  if (cell.isFlagged) {
    state.remainingBombs = state.remainingBombs - 1;
    cell.element.innerHTML = flagIcon;
  } else {
    cell.element.innerHTML = "";
    
    state.remainingBombs = state.remainingBombs + 1;
  }
}

function onCellRightClick(cell) {
  
  console.log("right click");
}

function onGameLose() {
  console.log("lose");

  setTimeout(() => {
    alert("You lost!");
  }, 100)
}

function onGameWin() {
  console.log("win");

  setTimeout(() => {
    alert("You win!");
  }, 100)
}

const callbacks = {
  onCellLeftClick,
  onCellRightClick,
  onGameWin,
  onGameLose
}

startGame(
  state.boardSize,
  state.numberOfBombs,
  boardElement,
  callbacks,
);

function onRestarButtonClick() {
  state.remainingBombs = state.numberOfBombs;

  restartGame(state.boardSize, state.numberOfBombs);
}

restartButtonElement.addEventListener("click", onRestarButtonClick);

