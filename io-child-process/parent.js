/**
 *
 * Created by Jess on 2024/5/23.
 */

'use strict';

const fs = require('node:fs');
const { fork } = require('child_process');

const workerPath = './child.js';

const outputFile = './data.txt';
// const fd = fs.openSync(outputFile, 'a');
const writeStream = fs.createWriteStream(outputFile, {
  flags: 'a',
});

for (let i = 0; i < 10; i++) {
  const workerName = `worker_${i}`;
  const worker = fork(workerPath, [workerName], {
    detached: true,
  });
  writeStream.write(`[worker_created]${workerName}\r\n`);
}
writeStream.write(`[parent]end\r\n`);
console.log('Parent process started workers.');
