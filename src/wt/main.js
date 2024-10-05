import { cpus } from 'os';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
  // Write your code here
  const getWorkersQuantity = () => cpus().length;

  const pathToFile = fileURLToPath(import.meta.url);
  const pathToDir = dirname(pathToFile);

  const pathToWorker = resolve(pathToDir, 'worker.js');
  const totalWorkers = getWorkersQuantity();
  const promises = [];

  for (let i = 10; i < totalWorkers + 10; i++) {
    promises.push(createWorker(i));
  }

  const resFromPromises = await Promise.allSettled(promises);

  const printConsole = resFromPromises.map((elem) =>
    elem.value
      ? { status: elem.value.status, data: elem.value.data }
      : { status: elem.reason.status, data: elem.reason.data }
  );

  console.log(printConsole);

  function createWorker(data) {
    return new Promise((res, rej) => {
      const worker = new Worker(pathToWorker, { workerData: data });
      worker.postMessage({ status: 'answer', data });
      worker.on('message', (dataFromWorker) => {
        res(dataFromWorker);
      });
      worker.on('error', (err) => {
        if (err) {
          rej({ status: 'error', data: null });
        }
      });
      worker.on('exit', (code) => {
        if (code === 0) return;
        rej(`Worker stopped with code ${code}`);
      });
    });
  }
};

await performCalculations();

/* 
main.js - implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file worker.js and able to send data to those threads and to receive result of the computation from them. You should send incremental number starting from 10 to each worker. For example: on host machine with 4 cores you should create 4 workers and send 10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
data - value from worker in case of success or null in case of error in worker
*/
