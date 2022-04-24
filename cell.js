import { createTwoDimensionalArray } from './utils.js';

function handleCellRightClick(event) {
  event.preventDefault();
  console.log('right clicked ' + event.target.dataset.row + ' ' + event.target.dataset.column);
}

function handleCellClick(event) {
  console.log('clicked ' + event.target.dataset.row + ' ' + event.target.dataset.column);
}

function createCell(row, column, isBomb) {
  const cell = document.createElement('div');
  
  cell.dataset.row = row;
  cell.dataset.column = column;

  cell.innerHTML = `${row} | ${column}`;

  cell.classList.add('cell');
  if (isBomb) cell.classList.add('bomb');

  cell.addEventListener('click', handleCellClick);

  cell.addEventListener('contextmenu', handleCellRightClick);

  return cell;
}

export function createCellsArray(boardSize, bombsPosition) {
  const cellsArray = createTwoDimensionalArray(boardSize, boardSize, (row, column) => {
    const isBomb = bombsPosition.some(bomb => bomb.row === row && bomb.column === column);

    const cell = createCell(row, column, isBomb);

    return cell;
  });

  return cellsArray
}