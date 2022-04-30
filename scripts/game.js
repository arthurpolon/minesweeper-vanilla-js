import { mapTwoDimensionalArray } from "./utils.js";
import { createCellsArray } from "./cell.js";

const bombIcon = '<svg style="margin-left: 4px;" width="24px" height="24px" viewBox="0 0 314 314" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M261.265 1.82716C259.112 3.57016 258.904 4.50316 258.904 12.4152C258.904 20.3272 259.112 21.2602 261.265 23.0032C264.312 25.4712 267.883 25.4362 270.404 22.9152C272.09 21.2292 272.404 19.5822 272.404 12.4152C272.404 5.24816 272.09 3.60116 270.404 1.91516C267.883 -0.605842 264.312 -0.640839 261.265 1.82716ZM232.578 14.2292C229.221 17.8042 229.82 21.0502 234.878 26.6752C240.284 32.6882 244.395 34.6962 247.969 33.0672C251.004 31.6842 252.665 27.7282 251.496 24.6652C251.024 23.4282 248.137 20.0532 245.081 17.1652C238.869 11.2972 235.973 10.6162 232.578 14.2292ZM285.459 18.4362C280.024 24.0962 279.283 25.3172 279.843 27.6862C280.612 30.9322 283.848 33.9152 286.601 33.9152C287.688 33.9152 291.463 31.1442 294.991 27.7562C302.156 20.8762 303.07 17.8292 299.09 14.0892C295.119 10.3592 292.375 11.2342 285.459 18.4362ZM246.307 57.5392L228.584 75.1632L223.744 70.7032C211.263 59.1992 200.709 52.7192 194.176 52.5482C190.726 52.4572 189.664 53.1942 181.455 61.3642L172.499 70.2792L163.748 67.5662C149.13 63.0342 137.889 61.6402 120.904 62.2532C88.6919 63.4162 60.4329 75.4082 38.0779 97.4042C3.55987 131.366 -8.51013 179.975 6.07387 226.289C16.8689 260.571 44.6589 290.667 77.7559 303.92C133.54 326.256 196.888 307.299 229.577 258.486C244.001 236.946 250.14 218.071 251.066 192.415C251.679 175.43 250.285 164.189 245.753 149.571L243.04 140.82L251.955 131.864C260.125 123.655 260.862 122.593 260.771 119.143C260.6 112.61 254.12 102.056 242.616 89.5752L238.156 84.7352L255.78 67.0122C268.056 54.6672 273.404 48.6122 273.404 47.0562C273.404 44.1782 269.141 39.9152 266.263 39.9152C264.707 39.9152 258.652 45.2632 246.307 57.5392ZM220.404 42.9152C217.883 45.4362 217.848 49.0072 220.316 52.0542C222.059 54.2072 222.992 54.4152 230.904 54.4152C238.816 54.4152 239.749 54.2072 241.492 52.0542C243.96 49.0072 243.925 45.4362 241.404 42.9152C239.718 41.2292 238.071 40.9152 230.904 40.9152C223.737 40.9152 222.09 41.2292 220.404 42.9152ZM290.404 42.9152C287.909 45.4102 287.843 49.0012 290.238 51.9582C292.277 54.4772 300.365 55.7082 306.865 54.4882C313.043 53.3292 315.187 46.8412 310.831 42.4852C309.653 41.3072 307.158 40.9152 300.833 40.9152C293.737 40.9152 292.088 41.2312 290.404 42.9152ZM284.255 62.1282C282.778 62.6222 281.083 64.2752 280.426 65.8622C278.87 69.6192 280.729 73.2702 287.011 78.8002C292.389 83.5342 296.196 84.1282 299.365 80.7262C302.708 77.1382 301.933 74.3222 295.849 67.9432C289.775 61.5752 288.226 60.7982 284.255 62.1282ZM261.265 71.8272C259.112 73.5702 258.904 74.5032 258.904 82.4152C258.904 90.3272 259.112 91.2602 261.265 93.0032C264.312 95.4712 267.883 95.4362 270.404 92.9152C272.09 91.2292 272.404 89.5822 272.404 82.4152C272.404 75.2482 272.09 73.6012 270.404 71.9152C267.883 69.3942 264.312 69.3592 261.265 71.8272ZM112.218 92.0052C92.7549 94.8202 73.3629 104.138 59.6539 117.263C54.8839 121.829 53.9789 126.315 57.2329 129.26C60.5349 132.249 64.8549 131.343 70.2789 126.526C83.6119 114.685 98.2209 108.163 117.71 105.352C124.533 104.368 127.565 98.6362 123.654 94.1132C121.342 91.4392 119.051 91.0162 112.218 92.0052Z" fill="black"/><path d="M59.6539 117.263C73.3629 104.138 92.7549 94.8202 112.218 92.0052C119.051 91.0162 121.342 91.4392 123.654 94.1132C127.565 98.6362 124.533 104.368 117.71 105.352C98.2209 108.163 83.6119 114.685 70.2789 126.526C64.8549 131.343 60.5349 132.249 57.2329 129.26C53.9789 126.315 54.8839 121.829 59.6539 117.263Z" fill="white"/><path d="M258.904 82.4152C258.904 74.5032 259.112 73.5702 261.265 71.8272C264.312 69.3592 267.883 69.3942 270.404 71.9152C272.09 73.6012 272.404 75.2482 272.404 82.4152C272.404 89.5822 272.09 91.2292 270.404 92.9152C267.883 95.4362 264.312 95.4712 261.265 93.0032C259.112 91.2602 258.904 90.3272 258.904 82.4152Z" fill="white"/><path d="M280.426 65.8622C281.083 64.2752 282.778 62.6222 284.255 62.1282C288.226 60.7982 289.775 61.5752 295.849 67.9432C301.933 74.3222 302.708 77.1382 299.365 80.7262C296.196 84.1282 292.389 83.5342 287.011 78.8002C280.729 73.2702 278.87 69.6192 280.426 65.8622Z" fill="white"/><path d="M290.238 51.9582C287.843 49.0012 287.909 45.4102 290.404 42.9152C292.088 41.2312 293.737 40.9152 300.833 40.9152C307.158 40.9152 309.653 41.3072 310.831 42.4852C315.187 46.8412 313.043 53.3292 306.865 54.4882C300.365 55.7082 292.277 54.4772 290.238 51.9582Z" fill="white"/><path d="M279.843 27.6862C279.283 25.3172 280.024 24.0962 285.459 18.4362C292.375 11.2342 295.119 10.3592 299.09 14.0892C303.07 17.8292 302.156 20.8762 294.991 27.7562C291.463 31.1442 287.688 33.9152 286.601 33.9152C283.848 33.9152 280.612 30.9322 279.843 27.6862Z" fill="white"/><path d="M258.904 12.4152C258.904 4.50316 259.112 3.57016 261.265 1.82716C264.312 -0.640839 267.883 -0.605842 270.404 1.91516C272.09 3.60116 272.404 5.24816 272.404 12.4152C272.404 19.5822 272.09 21.2292 270.404 22.9152C267.883 25.4362 264.312 25.4712 261.265 23.0032C259.112 21.2602 258.904 20.3272 258.904 12.4152Z" fill="white"/><path d="M234.878 26.6752C229.82 21.0502 229.221 17.8042 232.578 14.2292C235.973 10.6162 238.869 11.2972 245.081 17.1652C248.137 20.0532 251.024 23.4282 251.496 24.6652C252.665 27.7282 251.004 31.6842 247.969 33.0672C244.395 34.6962 240.284 32.6882 234.878 26.6752Z" fill="white"/><path d="M220.316 52.0542C217.848 49.0072 217.883 45.4362 220.404 42.9152C222.09 41.2292 223.737 40.9152 230.904 40.9152C238.071 40.9152 239.718 41.2292 241.404 42.9152C243.925 45.4362 243.96 49.0072 241.492 52.0542C239.749 54.2072 238.816 54.4152 230.904 54.4152C222.992 54.4152 222.059 54.2072 220.316 52.0542Z" fill="white"/></svg>';

const state = {
  boardSize: {rows: 0, columns: 0},
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
      cell.element.innerHTML = bombIcon;
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
    const randomRow = Math.floor(Math.random() * state.boardSize.rows);
    const randomColumn = Math.floor(Math.random() * state.boardSize.columns);

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
    "repeat(" + state.boardSize.rows + ", 40px)";
  state.boardElement.style.gridTemplateColumns =
    "repeat(" + state.boardSize.columns + ", 40px)";
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
    numberOfBombs > boardSize.rows * boardSize.columns
      ? boardSize.rows * boardSize.columns
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
