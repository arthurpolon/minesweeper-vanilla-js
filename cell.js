import { createTwoDimensionalArray, mapTwoDimensionalArray } from './utils.js';

function handleCellRightClick(event) {
  event.preventDefault();
  console.log('right clicked ' + event.target.dataset.row + ' ' + event.target.dataset.column);
}

function handleCellClick(event) {
  console.log('clicked ' + event.target.dataset.row + ' ' + event.target.dataset.column);
}

function checkForNearbyBombs(row, column, cellsArray) {
  let nearbyBombs = 0;

  for(let offsetRow = -1; offsetRow <= 1; offsetRow++) {
    for (let offsetColumn = -1; offsetColumn <= 1; offsetColumn++) {
      if (offsetRow === 0 && offsetColumn === 0) continue;

      const currentCell = cellsArray[row + offsetRow]?.[column + offsetColumn];

      if (currentCell && currentCell.isBomb) {
        nearbyBombs++;
      }
    }
  }

  return nearbyBombs
}

function createCell(row, column, bombsPosition) {
  const element = document.createElement('div');

  const cell = {
    element,
    isBomb: bombsPosition.some(bomb => bomb.row === row && bomb.column === column),
  }

  cell.element.dataset.row = row;
  cell.element.dataset.column = column;

  cell.element.classList.add('cell');
  if (cell.isBomb) cell.element.classList.add('bomb');

  cell.element.addEventListener('click', handleCellClick);
  cell.element.addEventListener('contextmenu', handleCellRightClick);

  return cell;
}

function setCellsContent(cellsArray) {
  mapTwoDimensionalArray(cellsArray, (value, row, column) => {
    if (value.isBomb) {
      value.element.innerHTML = '💣';
    } else {
      const nearbyBombs = checkForNearbyBombs(row, column, cellsArray);

      value.element.innerHTML = nearbyBombs;
    }
  })
}

export function createCellsArray(boardSize, bombsPosition) {
  const cellsArray = createTwoDimensionalArray(boardSize, boardSize, (row, column) => {

    const cell = createCell(row, column, bombsPosition);

    return cell;
  });

  setCellsContent(cellsArray);

  return cellsArray
}