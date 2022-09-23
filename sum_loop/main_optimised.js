const fs = require('fs');

function sumMatrix(matrix, majorOrder) {
  console.time('summing');
  // const start = Date.now();
  let sum = 0;

  // Row major traversal;
  if (majorOrder == 'row') {
    for (let row = 0, rlen = matrix.length; row < rlen; row++) {
      let rSum = 0;
      for (let col = 0, clen = matrix.length; col < clen; col++) {
        // -sum += matrix[row][col];
        rSum += matrix[row][col];
      }
      sum += rSum;
    }
  } else {
    for (let col = 0, clen = matrix.length; col < clen; col++) {
      let cSum = 0;
      for (let row = 0, rlen = matrix.length; row < rlen; row++) {
        // -sum += matrix[row][col];
        cSum += matrix[row][col];
      }
      sum += cSum;  
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
