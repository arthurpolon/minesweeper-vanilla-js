import { mapTwoDimensionalArray } from './utils.js';
import { createCellsArray } from './cell.js';

const board = document.querySelector('.board');
const restartButton  = document.querySelector('.restart-button');

const boardSize = parseInt(board.dataset.size)
const numberOfBombs = parseInt(board.dataset.bombs)

function generateRandomBombs(_numberOfBombs, boardSize) {
  const bombs = [];

  let numberOfBombs = _numberOfBombs;

  if (_numberOfBombs > boardSize * boardSize) {
    numberOfBombs = boardSize * boardSize;
  }

  while(bombs.length < numberOfBombs) {
    const randomRow = Math.floor(Math.random() * boardSize);
    const randomColumn = Math.floor(Math.random() * boardSize);

    const bomb = {
      row: randomRow,
      column: randomColumn
    };

    if(!bombs.some(currentBomb => currentBomb.row === bomb.row && currentBomb.column === bomb.column)) {
      bombs.push(bomb);
    }
  }

  return bombs;
}

function stopPropagation(event) {
  event.stopImmediatePropagation();
}

function disableClickOnBoard() {
  board.addEventListener('click', stopPropagation, {capture: true});
  board.addEventListener('contextmenu', stopPropagation, {capture: true});
}

function revealAllBombs(cellsArray) {
  mapTwoDimensionalArray(cellsArray, (cell) => {
    if (cell.isBomb) {
      cell.element.innerText = '💣';
      cell.element.classList.add('bomb');
    }
  })
}

function gameWon(cellsArray) {
  disableClickOnBoard();
  revealAllBombs(cellsArray);

  setTimeout(() => {
    alert('You won!');
  }, 10)
}

function gameOver(cellsArray) {
  disableClickOnBoard();
  revealAllBombs(cellsArray);

  setTimeout(() => {
    alert('You lose!');
  }, 10)
}

function checkIfGameEnded(cell, cellsArray, event) {
  if (cell.isFlagged) {
    return;
  }

  if (cell.isBomb) {
    gameOver(cellsArray);

    return
  }

  const hiddenCells = document.querySelectorAll('.cell.hidden');

  if (hiddenCells.length === numberOfBombs) {
    gameWon(cellsArray);
  }
}

function populateBoard(boardSize, bombsPosition) {
  board.style.gridTemplateRows = 'repeat(' + boardSize + ', 40px)';
  board.style.gridTemplateColumns = 'repeat(' + boardSize + ', 40px)';

  const cellsArray = createCellsArray(boardSize, bombsPosition);

  mapTwoDimensionalArray(cellsArray, (cell, row, column) => {
    board.appendChild(cell.element);

    cell.element.addEventListener('click', (event) => checkIfGameEnded(cell, cellsArray, event));
  })
}

const bombsPosition = generateRandomBombs(numberOfBombs, boardSize);

populateBoard(boardSize, bombsPosition);

function restartGame() {
  board.innerHTML = '';
  const newBombsPosition = generateRandomBombs(numberOfBombs, boardSize);

  board.removeEventListener('click', stopPropagation, {capture: true});
  board.removeEventListener('contextmenu', stopPropagation, {capture: true});

  populateBoard(boardSize, newBombsPosition);
}

restartButton.addEventListener('click', restartGame)