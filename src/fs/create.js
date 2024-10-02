import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const create = async () => {
  const data = 'I am fresh and young';
  const { filename } = import.meta;
  const __dirName = dirname(filename);

  const pathToNewFile = resolve(__dirName, 'files', 'fresh.txt');

  try {
    await writeFile(pathToNewFile, data, { flag: 'ax' });
  } catch {
    throw new Error('FS operation failed');
  }
};

await create();

/* create.js - implement function that creates new file fresh.txt with content I am fresh and young inside of the files folder (if file already exists Error with message FS operation failed must be thrown) */
