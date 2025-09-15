//Memoization is a way for functions to run faster by storing the result of a expensive fun and returning the result if same input is given
//specially used in recursion
//basic memo
let result;
function sum() {
  if (result) {
    return result;
  }
  for (let i = 1; i < 1000000; i++) {}
  result = 1 + 1;
  return 1 + 1;
}
//console.log(sum());
//console.log(sum());

//how to memo using closures
function memoizedSum() {
  let result = {};
  return function (n1, n2) {
    if (result[`${n1},${n2}`]) {
      //console.log("Cached result");
      return result[`${n1},${n2}`];
    }
    result[`${n1},${n2}`] = n1 + n2;
    return n1 + n2;
  };
}
const sum1 = memoizedSum();
//console.log(sum1(4, 5));
//console.log(sum1(4, 5));
//console.log(sum1(1, 2));

//but the above fn is static so . . .
//Memo with HOF

function memo(fn) {
  let result = {};
  return function (...args) {
    if (result[args]) {
      //console.log("Cached result");
      return result[args];
    }
    const res = fn(...args);
    result[args] = res;
    return res;
  };
}
function fibo(n) {
  if (n <= 1) {
    return n;
  }
  return fibo(n - 1) + fibo(n - 2);
}

const memFib = memo(fibo);
//const start = Date.now(); 1st way
// const start = performance.now(); 2nd way
//console.time("fibo"); // 3rd way
//console.log(fibo(30));
//console.timeEnd("fibo");
// console.log(performance.now() - start);
//console.log((Date.now() - start) / 1000);

// console.time("fibo");
// console.log(memFib(30));
// console.timeEnd("fibo");

// console.time("fibo");
// console.log(memFib(30));
// console.timeEnd("fibo");

// console.time("fibo");
// console.log(memFib(30));
// console.timeEnd("fibo");

//3rd way using default pararmenters

function fibonacci(n, memo = {}) {
  if (memo[n]) {
    return memo[n];
  }

  if (n <= 1) {
    return n;
  }

  const res = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo[n] = res;
  return res;
}
// console.time("fibo");
//console.log(fibonacci(31));
// console.timeEnd("fibo");

// console.time("fibo");
//console.log(fibonacci(31));
// console.timeEnd("fibo");

// console.time("fibo");
//console.log(fibonacci(31));
// console.timeEnd("fibo");

// console.time("fibo");
//console.log(fibonacci(31));
// console.timeEnd("fibo");

//usecase of memoization:- cache expiry(time-to-live), LRU etc
//better to use WeakMap and WeakSet as data structure because they are easily garbage collected
//memoization is most effective when when the performance gained from avoiding recomputation outweighs the memory cost of storied cached result
//unbounded memoization can lead to memory issue like excessive memory growth, memory fragmentation and out-of-memory errors,
