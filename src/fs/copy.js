import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { cp } from 'node:fs/promises';

const copy = async () => {
  const filename = fileURLToPath(import.meta.url);

  const __dirName = dirname(filename);
  const pathToSource = resolve(__dirName, 'files');
  const pathForCopy = resolve(__dirName, 'files_copy');
  try {
    await cp(pathToSource, pathForCopy, { recursive: true, force: false, errorOnExist: true });
  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();

/* 
copy.js - implement function that copies folder files files with all its content into folder files_copy at the same level (if files folder doesn't exists or files_copy has already been created Error with message FS operation failed must be thrown)
*/
