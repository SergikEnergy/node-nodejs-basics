import { env } from 'node:process';

const parseEnv = () => {
  const envPairs = Object.entries(env);
  const res = [];

  envPairs.forEach(([key, value]) => {
    if (key && key.match('RSS_')) {
      res.push(`${key}=${value}`);
    }
  });

  console.log(res.join('; '));
};

parseEnv();

/* env.js - implement function that parses environment variables with prefix RSS_ and prints them to the console in the format RSS_name1=value1; RSS_name2=value2 */
