import { Transform } from 'node:stream';

const transform = async () => {
  console.log('Type smth into console... (For exit press Ctrl + C)');
  const reverseString = (str) => str.trim().split('').reverse().concat('\n').join('');

  const transformReverse = new Transform({
    transform: (chunk, encoding, cb) => {
      cb(null, reverseString(chunk.toString()));
    },
  });

  process.stdin
    .pipe(transformReverse)
    .pipe(process.stdout)
    .on('error', () => {
      throw new Error('FS Operation failed');
    });
};

await transform();

/* 
transform.js - implement function that reads data from process.stdin, reverses text using Transform Stream and then writes it into process.stdout
*/
