import {createTwoDimensionalArray, mapTwoDimensionalArray} from './utils.js';

const board = document.querySelector('.board');

const boardSize = parseInt(board.dataset.size)
const numberOfBombs = parseInt(board.dataset.bombs)

function createCell(row, column) {
  const cell = document.createElement('div');
  
  cell.dataset.row = row;
  cell.dataset.column = column;

  cell.classList.add('cell');
  cell.innerHTML = `<span class="cell-number">${row} | ${column}</span>`;

  return cell;
}

function createCellsArray() {
  const cellsArray = createTwoDimensionalArray(boardSize, boardSize, (row, column) => {
    const cell = createCell(row, column);

    return cell;
  });

  return cellsArray
}

function populateBoard() {
  board.style.gridTemplateRows = 'repeat(' + boardSize + ', 40px)';
  board.style.gridTemplateColumns = 'repeat(' + boardSize + ', 40px)';

  const cellsArray = createCellsArray();

  mapTwoDimensionalArray(cellsArray, (value, row, column) => {
    board.appendChild(value);
  })
}

populateBoard();