import { resolve, dirname } from 'node:path';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';

const read = async () => {
  const { filename } = import.meta;

  const __dirname = dirname(filename);
  const pathToReadFile = resolve(__dirname, 'files', 'fileToRead.txt');

  try {
    createReadStream(pathToReadFile)
      .on('error', () => {
        throw new Error('FS operation failed');
      })
      .pipe(stdout);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();

/* read.js - implement function that prints content of the fileToRead.txt into console (if there's no file fileToRead.txt Error with message FS operation failed must be thrown) */
