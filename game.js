import { mapTwoDimensionalArray } from './utils.js';
import { createCellsArray } from './cell.js';

const board = document.querySelector('.board');

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

function populateBoard(boardSize, bombsPosition) {
  board.style.gridTemplateRows = 'repeat(' + boardSize + ', 40px)';
  board.style.gridTemplateColumns = 'repeat(' + boardSize + ', 40px)';

  const cellsArray = createCellsArray(boardSize, bombsPosition);

  mapTwoDimensionalArray(cellsArray, (value, row, column) => {
    board.appendChild(value);
  })
}

const bombsPosition = generateRandomBombs(numberOfBombs, boardSize);

populateBoard(boardSize, bombsPosition);