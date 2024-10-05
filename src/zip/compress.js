import { createReadStream, createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);
  const fileToRead = resolve(pathToDir, 'files', 'fileToCompress.txt');
  const fileToWrite = resolve(pathToDir, 'files', 'archive.gz');

  const gzip = createGzip();
  const readStream = createReadStream(fileToRead, { encoding: 'utf-8' });
  const writeStream = createWriteStream(fileToWrite);

  const throwError = () => {
    throw new Error('FS Operation failed');
  };

  readStream.on('error', throwError).pipe(gzip).on('error', throwError).pipe(writeStream).on('error', throwError);
};

await compress();

/* 
compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API
*/
