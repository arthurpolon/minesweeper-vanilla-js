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

      if (currentCell && currentCell.dataset.isBomb === 'true') {
        nearbyBombs++;
      }
    }
  }

  return nearbyBombs
}

function createCell(row, column, isBomb) {
  const cell = document.createElement('div');
  
  cell.dataset.row = row;
  cell.dataset.column = column;
  cell.dataset.isBomb = isBomb;

  cell.classList.add('cell');
  if (isBomb) cell.classList.add('bomb');

  cell.addEventListener('click', handleCellClick);
  cell.addEventListener('contextmenu', handleCellRightClick);

  return cell;
}

function setCellsContent(cellsArray) {
  mapTwoDimensionalArray(cellsArray, (value, row, column) => {
    if (value.dataset.isBomb === 'false') {
      const nearbyBombs = checkForNearbyBombs(row, column, cellsArray);

      value.innerHTML = nearbyBombs;
    } else {
      value.innerHTML = '💣';
    }
  })
}

export function createCellsArray(boardSize, bombsPosition) {
  const cellsArray = createTwoDimensionalArray(boardSize, boardSize, (row, column) => {
    const isBomb = bombsPosition.some(bomb => bomb.row === row && bomb.column === column);

    const cell = createCell(row, column, isBomb);

    return cell;
  });

  setCellsContent(cellsArray);

  return cellsArray
}