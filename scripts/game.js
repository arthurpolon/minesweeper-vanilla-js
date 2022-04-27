import { mapTwoDimensionalArray } from "./utils.js";
import { createCellsArray } from "./cell.js";

const state = {
  boardSize: 0,
  numberOfBombs: 0,
  boardElement: null,
  cellsArray: [],
  bombsPosition: [],
  numberOfFlags: 0,

  callbacks: {},
};

function stopEventPropagation(event) {
  event.stopImmediatePropagation();
}

function disableClickOnBoard() {
  state.boardElement.addEventListener("click", stopEventPropagation, {
    capture: true,
  });
  state.boardElement.addEventListener("contextmenu", stopEventPropagation, {
    capture: true,
  });
}

function revealAllBombs() {
  mapTwoDimensionalArray(state.cellsArray, (cell) => {
    if (cell.isBomb) {
      cell.element.innerText = "💣";
      cell.element.classList.add("bomb");
    }
  });
}

function winTheGame() {
  disableClickOnBoard();
  revealAllBombs();

  if (state.callbacks.onGameWin) {
    state.callbacks.onGameWin();
  }
}

function loseTheGame() {
  disableClickOnBoard();
  revealAllBombs();

  if (state.callbacks.onGameLose) {
    state.callbacks.onGameLose();
  }
}

function checkIfGameEnded(cell) {
  if (cell.isFlagged) {
    return;
  }

  if (cell.isBomb) {
    loseTheGame();

    return;
  }

  const hiddenCells = document.querySelectorAll(".cell.hidden");

  if (hiddenCells.length === state.numberOfBombs) {
    winTheGame();
  }
}

function appendCellsToBoard() {
  mapTwoDimensionalArray(state.cellsArray, (cell) => {
    state.boardElement.appendChild(cell.element);

    cell.element.addEventListener("click", () => {
      checkIfGameEnded(cell);

      if (state.callbacks.onCellRightClick) {
        state.callbacks.onCellRightClick(cell);
      }
    });

    if (state.callbacks.onCellLeftClick) {
      cell.element.addEventListener("contextmenu", () => {
        state.callbacks.onCellLeftClick(cell)
      });
    }
  });
}

function generateRandomBombs() {
  const bombs = [];

  while (bombs.length < state.numberOfBombs) {
    const randomRow = Math.floor(Math.random() * state.boardSize);
    const randomColumn = Math.floor(Math.random() * state.boardSize);

    const bomb = {
      row: randomRow,
      column: randomColumn,
    };

    if (
      !bombs.some(
        (currentBomb) =>
          currentBomb.row === bomb.row && currentBomb.column === bomb.column
      )
    ) {
      bombs.push(bomb);
    }
  }

  return bombs;
}

function setBoardStyles() {
  state.boardElement.style.display = "grid";
  state.boardElement.style.gridTemplateRows =
    "repeat(" + state.boardSize + ", 40px)";
  state.boardElement.style.gridTemplateColumns =
    "repeat(" + state.boardSize + ", 40px)";
}

export function startGame(
  boardSize,
  numberOfBombs,
  boardElement,
  callbacks,
) {
  state.boardSize = boardSize;
  state.boardElement = boardElement;
  state.numberOfBombs =
    numberOfBombs > boardSize * boardSize
      ? boardSize * boardSize
      : numberOfBombs;

  state.callbacks = callbacks;

  setBoardStyles();

  const bombsPosition = generateRandomBombs();
  const cellsArray = createCellsArray(boardSize, bombsPosition);

  state.cellsArray = cellsArray;
  state.bombsPosition = bombsPosition;

  appendCellsToBoard(cellsArray);
}

export function restartGame(_boardSize, _numberOfBombs) {
  state.boardElement.innerHTML = "";

  const boardSize = _boardSize || state.boardSize;
  const numberOfBombs = _numberOfBombs || state.numberOfBombs;

  state.boardElement.removeEventListener("click", stopEventPropagation, {
    capture: true,
  });
  state.boardElement.removeEventListener("contextmenu", stopEventPropagation, {
    capture: true,
  });

  startGame(
    boardSize,
    numberOfBombs,
    state.boardElement,
    state.callbacks
  );
}