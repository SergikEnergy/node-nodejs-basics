import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const spawnChildProcess = async (args) => {
  const pathToCurrFile = fileURLToPath(import.meta.url);
  const pathToCurrFolder = dirname(pathToCurrFile);
  const pathToChildProcess = resolve(pathToCurrFolder, 'files', 'script.js');

  const forkedChild = fork(pathToChildProcess, args, { stdio: ['inherit', 'inherit', 'pipe', 'ipc'] });
  forkedChild.on('close', (code) => {
    if (code !== 0) {
      console.error(`Child process was closed with code: ${code}`);
    }
    process.exit(0);
  });

  forkedChild.on('error', (err) => {
    console.error(`An error with ${err.message} ocurred`);
  });

  forkedChild.on('exit', () => {
    console.log('exit from the child process');
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);

/* 
cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js, passing these args to it. This function should create IPC-channel between stdin and stdout of master process and child process:
child process stdin should receive input from master process stdin
child process stdout should send data to master process stdout
*/
