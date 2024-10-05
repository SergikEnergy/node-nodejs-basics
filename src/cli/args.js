const parseArgs = () => {
  const customArgv = process.argv.slice(2);

  const result = customArgv.reduce((acc, curr, ind) => {
    if (curr.startsWith('--')) {
      acc += `${curr.replace('--', '')} is ${customArgv[ind + 1]}, `;
    }
    return acc;
  }, '');

  console.log(result.substring(0, result.length - 2));
};

parseArgs();

/* args.js - implement function that parses command line arguments (given in format --propName value --prop2Name value2, you don't need to validate it) and prints them to the console in the format propName is value, prop2Name is value2 */
