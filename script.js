import { restartGame, startGame } from "./game.js";

const boardElement = document.querySelector(".board");
const restartButtonElement = document.querySelector(".restart-button");
const remainingBombsElement = document.querySelector(".remaining-bombs");

const BOARD_SIZE = 10;
const NUMBER_OF_BOMBS = 10;

const state = {
  get remainingBombs() {
    return Number(remainingBombsElement.innerText);
  },
  set remainingBombs(value) {
    remainingBombsElement.innerText = value;
  }
}

state.remainingBombs = NUMBER_OF_BOMBS;

function onCellLeftClick(cell) {
  console.log("left click");

  if (cell.isFlagged) {
    state.remainingBombs = state.remainingBombs - 1;
  } else {
    state.remainingBombs = state.remainingBombs + 1;
  }
}

function onCellRightClick(cell) {
  console.log("right click");
}

function onGameLost() {
  console.log("lose");

  setTimeout(() => {
    alert("You lost!");
  }, 100)
}

function onGameWon() {
  console.log("win");

  setTimeout(() => {
    alert("You win!");
  }, 100)
}

startGame(
  BOARD_SIZE,
  NUMBER_OF_BOMBS,
  boardElement,
  onGameWon,
  onGameLost,
  onCellRightClick,
  onCellLeftClick
);

function onRestarButtonClick() {
  state.remainingBombs = NUMBER_OF_BOMBS;

  restartGame(BOARD_SIZE, NUMBER_OF_BOMBS);
}

restartButtonElement.addEventListener("click", onRestarButtonClick);
