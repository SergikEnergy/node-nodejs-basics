import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createWriteStream } from 'node:fs';

const write = async () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);
  const fileToWrite = resolve(pathToDir, 'files', 'fileToWrite.txt');

  const myWriteStream = createWriteStream(fileToWrite);

  process.stdout.write('for exit press Ctrl+C' + '\n');
  process.stdout.write(`Please type smth into console and check it at the ${fileToWrite}\n`);

  process.stdin.pipe(myWriteStream).on('error', () => {
    throw new Error('FS Operation failed');
  });
};

await write();

/* 
write.js - implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream
 */
