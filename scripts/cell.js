import { createTwoDimensionalArray, mapTwoDimensionalArray } from "./utils.js";

function unFlagCell(cell) {
  cell.isFlagged = false;
  cell.element.classList.remove("flag");
}

function flagCell(cell) {
  if (cell.isHidden) {
    cell.isFlagged = true;
    cell.element.classList.add("flag");
  }
}

function revealCell(cell) {
  if (cell.isHidden && !cell.isFlagged) {
    cell.isHidden = false;
    cell.element.classList.remove("hidden");

    if (cell.isBomb) {
      cell.element.classList.add("bomb");
      cell.element.innerHTML = "💣";

      return;
    }

    cell.element.innerHTML = cell.neighborMines ? cell.neighborMines : "";

    if (cell.neighborMines === 0) {
      cell.neighbors.forEach((neighbor) => {
        if (!neighbor.isBomb) {
          neighbor.isFlagged = false;
          neighbor.element.classList.remove("flag");
        }

        revealCell(neighbor);
      });
    }
  }
}

function handleCellRightClick(cell, event) {
  event.preventDefault();

  if (cell.isFlagged) {
    unFlagCell(cell);
  } else {
    flagCell(cell);
  }
}

function handleCellClick(cell) {
  revealCell(cell);
}

function setCellsNeighbors(cellsArray) {
  mapTwoDimensionalArray(cellsArray, (value, row, column) => {
    for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
      for (let offsetColumn = -1; offsetColumn <= 1; offsetColumn++) {
        if (offsetRow === 0 && offsetColumn === 0) continue;

        const currentCell =
          cellsArray[row + offsetRow]?.[column + offsetColumn];

        if (currentCell) {
          value.neighbors.push(currentCell);
          value.neighborMines += currentCell.isBomb ? 1 : 0;
        }
      }
    }
  });
}

function createCell(row, column, bombsPosition) {
  const element = document.createElement("div");

  const cell = {
    row,
    column,
    element,
    neighbors: [],
    isHidden: true,
    isFlagged: false,
    neighborMines: 0,
    isBomb: bombsPosition.some(
      (bomb) => bomb.row === row && bomb.column === column
    ),
  };

  cell.element.dataset.row = row;
  cell.element.dataset.column = column;

  cell.element.classList.add("cell");
  cell.element.classList.add("hidden");

  cell.element.addEventListener("click", (event) =>
    handleCellClick(cell, event)
  );
  cell.element.addEventListener("contextmenu", (event) =>
    handleCellRightClick(cell, event)
  );

  return cell;
}

export function createCellsArray(boardSize, bombsPosition) {
  const cellsArray = createTwoDimensionalArray(
    boardSize,
    boardSize,
    (row, column) => {
      const cell = createCell(row, column, bombsPosition);

      return cell;
    }
  );

  setCellsNeighbors(cellsArray);

  // setAllCellsContent(cellsArray);

  return cellsArray;
}

function setAllCellsContent(cellsArray) {
  mapTwoDimensionalArray(cellsArray, (cell, row, column) => {
    if (cell.isBomb) {
      // cell.element.innerHTML = '💣';
      cell.element.classList.add("bomb");
    } else {
      // cell.element.innerHTML = cell.neighborMines;
    }
  });
}
