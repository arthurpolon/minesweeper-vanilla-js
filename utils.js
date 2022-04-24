export function createTwoDimensionalArray(rows, columns, callback) {
  const _2DArray = [];

  for(let row = 0; row < rows; row++) {
    const rowArr = [];

    for(let column = 0; column < columns; column++) {
      const value = callback(row, column);

      rowArr.push(value)
    }

    _2DArray.push(rowArr)
  }

  return _2DArray;
}

export function mapTwoDimensionalArray(_2DArray, callback) {
  for (let row = 0; row < _2DArray.length; row++) {
    for (let column = 0; column < _2DArray[row].length; column++) {
      callback(_2DArray[row][column], row, column);
    }
  }
}