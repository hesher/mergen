import {mergen} from './mergen.js';

function timer(time = 500) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}

async function* gen1() {
  await timer(100);
  yield 1;
  await timer(300);
  yield 4;
}

async function* gen2() {
  await timer(200);
  yield 2;
  await timer(100);
  yield 3;
}

async function printGen(gen) {
  let max = 10;
  for await (x of gen) {
    if (x) console.log('Next up:', x);
    if (--max <= 0) break;
  }
}

printGen(mergen(gen1(), gen2())); // 1, 2, 3, 4
