import { dirname, resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const calculateHash = async () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);
  const pathToReadFile = resolve(pathToDir, 'files', 'fileToCalculateHashFor.txt');

  const createHashFunc = (content, algorithm = 'sha256') => {
    const hash = createHash(algorithm);
    const hashedData = hash.update(content, 'utf-8');

    return hashedData.digest('hex');
  };

  const readStream = createReadStream(pathToReadFile, { encoding: 'utf-8' });
  let result = '';
  readStream.on('data', (chunk) => {
    result += chunk;
  });

  readStream.on('error', () => {
    throw new Error('FS operation failed');
  });

  readStream.on('end', () => {
    const tempData = createHashFunc(result);
    process.stdout.write(tempData);
    process.stdout.write('\n');
  });
};

await calculateHash();

/* calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex using Streams API */
