import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createReadStream } from 'node:fs';

const read = async () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);
  const fileToRead = resolve(pathToDir, 'files', 'fileToRead.txt');

  const readStream = createReadStream(fileToRead, { encoding: 'UTF-8' });

  let result = '';
  readStream.on('readable', () => {
    let chunk;
    while ((chunk = readStream.read()) !== null) {
      result += chunk.toString();
    }
  });

  readStream.on('error', (err) => {
    throw new Error('FS operation failed');
  });

  readStream.on('end', () => {
    process.stdout.write(result);
    process.stdout.write('\n');
  });
};

await read();

/* 
read.js - implement function that reads file fileToRead.txt content using Readable Stream and prints it's content into process.stdout
 */
