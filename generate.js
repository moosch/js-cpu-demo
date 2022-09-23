const fs = require('fs');

const matrix = [];

let size = process.argv[2];
if (!size) return console.log("Please provide a matrix size. e.g. 50000");

size = Number(size);

for (let i = 0; i < size; i++) {
  if (!matrix[i]) {
    matrix[i] = [];
  }
  for (let j = 0; j < size; j++) {
    matrix[i][j] = Math.floor(Math.random() * 255);
  }
}

const json = JSON.stringify(matrix);

fs.writeFile('matrix.json', json, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
  console.log('Matrix generated');
});