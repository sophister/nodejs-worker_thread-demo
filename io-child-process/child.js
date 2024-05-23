/**
 *
 * Created by Jess on 2024/5/23.
 */

'use strict';

const fs = require('fs');

const outputFile = './data.txt';

const writeStream = fs.createWriteStream(outputFile, {
  flags: 'a',
});

const workerName = process.argv[2];
writeStream.write(`[worker_started]${workerName}\r\n`);
const start = Date.now();
while (start + 5000 > Date.now()) {
  // writeStream.write(`[worker_write]${workerName} ${Date.now()}\r\n`);
  writeStream.write(`[worker_write]${workerName} writing\r\n`);
}
writeStream.write(`[worker_finished]${workerName}\r\n`);
