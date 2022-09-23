const fs = require('fs');
const path = require('path');
const os = require('os');
const WorkerPool = require('../worker_pool/pool.js');

const workerPath = path.resolve(__dirname, 'worker.js');
const pool = new WorkerPool(os.cpus().length, workerPath);

function sumMatrix(matrix, majorOrder) {
  console.time('summing');
  let sum = 0;
  const matrixLength = matrix.length;
  
  // Row major traversal;
  if (majorOrder == 'row') {
    for (let row = 0, rlen = matrix.length; row < rlen; row++) {
      pool.runTask(matrix[row], (err, result) => {
        if (err) throw Error('Worker failed');

        sum += result;
        if (row+1 === matrixLength) {
          pool.close();
          console.timeEnd('summing');
          console.log('sum', sum);
        }
      });
    }
  } else {
    for (let col = 0, clen = matrix.length; col < clen; col++) {
      pool.runTask(matrix[col], (err, result) => {
        if (err) throw Error('Worker failed');

        sum += result;
        if (col+1 === matrixLength) {
          pool.close();
          console.timeEnd('summing');
          console.log('sum', sum);
        }
      });
    }
  }
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
