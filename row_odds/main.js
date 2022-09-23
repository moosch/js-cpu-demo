const fs = require('fs');

function rowOdds(matrix, majorOrder) {
  console.time('odds');
  const odds = []; // Num of odds in each row or col depending on majorOrder

  // Row major traversal;
  if (majorOrder == 'row') {
    for (let row = 0, rlen = matrix.length; row < rlen; row++) {
      odds[row] = 0;
      for (let col = 0, clen = matrix.length; col < clen; col++) {
        if (matrix[row][col] % 2 != 0) {
          odds[row]++;
        }
      }
    }
  } else {
    for (let col = 0, clen = matrix.length; col < clen; col++) {
      for (let row = 0, rlen = matrix.length; row < rlen; row++) {
        odds[col] = 0;
        if (matrix[row][col] % 2 != 0) {
          odds[col]++;
        }
      }
    }
  }

  console.timeEnd('odds');
  // odds = e.g [1, 5, 0, 2, 4]
}

const order = process.argv[2];

if (!order) return console.log('Please provide an order. Either row or col');

(() => fs.readFile('matrix.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const matrix = JSON.parse(data);

  rowOdds(matrix, order);
}))();
