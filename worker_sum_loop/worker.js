const { parentPort } = require('worker_threads');

function sumArray(arr) {
  let sum = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}

parentPort.on('message', (task) => {
  const sum = sumArray(task);
  parentPort.postMessage(sum);
});
