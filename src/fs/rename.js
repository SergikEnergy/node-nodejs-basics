import { dirname, resolve } from 'node:path';
import { rename as renameOrigin, stat } from 'node:fs/promises';

const isFileExist = async (absolutePath) => {
  try {
    await stat(absolutePath);
    return true;
  } catch {
    return false;
  }
};

const rename = async () => {
  const { filename } = import.meta;

  const __dirname = dirname(filename);
  const pathToSource = resolve(__dirname, 'files', 'wrongFilename.txt');
  const pathToRenamed = resolve(__dirname, 'files', 'properFilename.md');

  try {
    const isOriginFileExist = await isFileExist(pathToSource);
    const isRenamedFileExist = await isFileExist(pathToRenamed);

    if (!isOriginFileExist || isRenamedFileExist) {
      throw new Error('');
    }

    await renameOrigin(pathToSource, pathToRenamed);
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();

/* rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md (if there's no file wrongFilename.txt or properFilename.md already exists Error with message FS operation failed must be thrown) */
