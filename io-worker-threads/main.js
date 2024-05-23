/**
 *
 * Created by Jess on 2024/5/23.
 */

'use strict';

const {
  Worker, isMainThread, parentPort, workerData,
} = require('node:worker_threads');
const fs =  require('node:fs');

const outputFile = './data.txt';
// const fd = fs.openSync(outputFile, 'a');
const writeStream = fs.createWriteStream(outputFile, {
  flags: 'a',
});

if (isMainThread) {
  for( let i = 0; i < 10; i++) {
    const workerName = `worker_${i}`;
    const worker = new Worker(__filename, { workerData: workerName });
    writeStream.write(`[worker_created]${workerName}\r\n`);
  }
} else {
  const workerName = workerData;
  writeStream.write(`[worker_started]${workerName}\r\n`);
  const start = Date.now();
  while (start + 5000 > Date.now()) {
    writeStream.write(`[worker_write]${workerName} ${Date.now()}\r\n`);
  }
  writeStream.write(`[worker_finished]${workerName}\r\n`);
}
