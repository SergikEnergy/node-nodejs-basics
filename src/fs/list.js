import { dirname, resolve } from 'node:path';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const list = async () => {
  const filename = fileURLToPath(import.meta.url);

  const __dirname = dirname(filename);
  const pathToReadDir = resolve(__dirname, 'files');

  try {
    const filesList = await readdir(pathToReadDir);

    console.table(filesList.map((elem) => ({ FILE_NAME: elem })));
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();

/* list.js - implement function that prints all array of filenames from files folder into console (if files folder doesn't exists Error with message FS operation failed must be thrown) */
