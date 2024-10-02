import { dirname, resolve } from 'node:path';
import { unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const remove = async () => {
  const filename = fileURLToPath(import.meta.url);

  const __dirname = dirname(filename);
  const pathToFile = resolve(__dirname, 'files', 'fileToRemove.txt');
  try {
    await unlink(pathToFile);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();

/* delete.js - implement function that deletes file fileToRemove.txt (if there's no file fileToRemove.txt Error with message FS operation failed must be thrown) */
