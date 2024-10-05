import { createReadStream, createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createUnzip } from 'zlib';

const decompress = async () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);
  const fileToRead = resolve(pathToDir, 'files', 'archive.gz');
  const fileToWrite = resolve(pathToDir, 'files', 'fileToCompress2.txt');

  const rs = createReadStream(fileToRead);
  const ws = createWriteStream(fileToWrite);

  const unZip = createUnzip();

  const throwError = () => {
    throw new Error('FS Operation failed');
  };

  rs.on('error', throwError).pipe(unZip).on('error', throwError).pipe(ws).on('error', throwError);
};

await decompress();

/* 
decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with same content as before compression using zlib and Streams API
*/
