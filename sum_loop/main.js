const fs = require('fs');

function sumMatrix(matrix, majorOrder) {
  console.time('summing');
  let sum = 0;

  // Row major traversal;
  if (majorOrder == 'row') {
    for (let row = 0, rlen = matrix.length; row < rlen; row++) {
      for (let col = 0, clen = matrix.length; col < clen; col++) {
        sum += matrix[row][col];
      }
    }
  } else {
    for (let col = 0, clen = matrix.length; col < clen; col++) {
      for (let row = 0, rlen = matrix.length; row < rlen; row++) {
        sum += matrix[row][col];
      }
    }
  }

  console.timeEnd('summing')
}

const order = process.argv[2];

if (!order) return console.log('Please provide an order. Either row or col');

(() => fs.readFile('matrix.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const matrix = JSON.parse(data);

  sumMatrix(matrix, order);
}))();
