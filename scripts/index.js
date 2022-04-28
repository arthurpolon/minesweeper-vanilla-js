import { restartGame, startGame } from "./game.js";

const boardElement = document.querySelector(".board");
const restartButtonElement = document.querySelector(".restart-button");
const remainingBombsElement = document.querySelector(".remaining-bombs");

const boardSizeInput = document.querySelector(".board-size-input");
const numberOfBombsInput = document.querySelector(".number-of-bombs-input");
const boardSizeDisplay = document.querySelector(".board-size-display");
const numberOfBombsDisplay = document.querySelector(".number-of-bombs-display");

const state = {
  get remainingBombs() {
    return Number(remainingBombsElement.innerText);
  },
  set remainingBombs(value) {
    remainingBombsElement.innerText = value;
  },

  get boardSize() {
    return Number(boardSizeInput.value);
  },
  set boardSize(value) {
    if (numberOfBombsInput.value > value * value) {
      state.numberOfBombs = value * value;
      numberOfBombsInput.value = value * value;
    }

    numberOfBombsInput.max = value * value;
    boardSizeDisplay.innerText = value;
  },

  get numberOfBombs() {
    return Number(numberOfBombsInput.value);
  },
  set numberOfBombs(value) {
    numberOfBombsDisplay.innerText = value;
  }
}

state.remainingBombs = state.numberOfBombs;

function onCellLeftClick(cell) {
  console.log("left click");

  if (!cell.isHidden) {
    return
  }

  if (cell.isFlagged) {
    state.remainingBombs = state.remainingBombs - 1;
  } else {
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

function onBoardSizeInputChange(event) {
  state.boardSize = event.target.value;
}

function onNumberOfBombsInputChange(event) {
  state.numberOfBombs = event.target.value;
}

boardSizeInput.addEventListener("change", onBoardSizeInputChange);
numberOfBombsInput.addEventListener("change", onNumberOfBombsInputChange);

