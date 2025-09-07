/* 
Currying is a function that takes one argument at a time and returns a new function expecting the next argument. It is a conversion of functions from callable as f(a,b,c)into callable as f(a)(b)(c).

can be done in two ways. 1 using bind and 2 using closures
*/
//currying using bind
const multiply = function (a, b) {
  console.log(a * b);
};
const multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(3);

//currying using closures
const multiply1 = function (x) {
  return function (y) {
    console.log(x * y);
  };
};
const multiplyByThree = multiply1(3);
multiplyByThree(5); //OR
multiply1(10)(25);

//Q1 implement sum(1)(2)(3)(4)...(n)()
//this is before es6 way
const sum = function (a) {
  return function (b) {
    if (b) {
      return sum(a + b);
    } else {
      return a;
    }
  };
};
//this is es6 way
const sum1 = (a) => (b) => b ? sum1(a + b) : a;
const ans = sum(1)(2)(3)(4)(5)();
console.log(ans);
const ans1 = sum1(1)(2)(3)(4)(5)();
console.log(ans1);

//IMP- if nested functions are fixed, then arguements should also be same number if less than it will print the last function only

//Q2 implement sum(1,2,3, ...n)(3,4,...n)...(n)()
//where every arguement is a infinite series
const currSum = function (...a) {
  let sum = a.reduce((acc, curr) => acc + curr, 0);
  return function (...b) {
    if (b.length > 0) {
      sum += b.reduce((acc, curr) => acc + curr, 0);
      return currSum(sum);
    }
    return sum;
  };
};
const infiniteAns = currSum(10, 20, 30, 40, 50)(6, 7, 8, 9)(11, 12, 15, 25)();
console.log(infiniteAns);

//PARTIAL APPLICATION VS CURRYING
const mul = function (a) {
  return function (b) {
    return function (c) {
      console.log(a * b * c);
    };
  };
};
mul(4)(5)(6);
//partial
const mul1 = function (a) {
  return function (b, c) {
    console.log(a * b * c);
  };
};
mul1(4)(7, 8);
//Partial application transforms a function into another function with smaller arity.

//DOM manipultaion using currying. here we can
const getElement = function (heading) {
  const element = document.querySelector("#" + heading);
  return function (text) {
    element.textContent = text;
  };
};

const updateHeader = getElement("header");
updateHeader("MY NAME IS KC");

//Q3 implement curry() that takes a sum(a,b,c) and converts it to sum(a)(b)(c)
const sum2 = function (a, b, c) {
  console.log(a + b + c);
};
//key point ...spread operator spreads a array into its iterable data type
const curry = function (func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
};

const curriedSum = curry(sum2);
curriedSum(2)(4)(7);
curriedSum(2, 4)(7);
curriedSum(2)(4, 7);
/*
ASK GPT FOR ARGs TRACE 
If you want, I can walk you through exactly what args looks like at each step of curriedSum(2)(4)(7), so you can debug these things instantly in the future. Would you like me to do that?
*/

//Q4 implement curry() from above with placeholder support
// sum(_,_,3)(1)(_,2) to sum(1+2+3) in sequential manner

function curryWithPlaceholder(fn) {
  const placeholder = curry.placeholder;

  // Recursive helper to collect arguments
  function curried(...argsSoFar) {
    return function nextCurried(...newArgs) {
      // Create a copy so we don't mutate
      const mergedArgs = argsSoFar.slice();

      // Fill placeholders with new arguments
      let newArgIndex = 0;
      for (
        let i = 0;
        i < mergedArgs.length && newArgIndex < newArgs.length;
        i++
      ) {
        if (mergedArgs[i] === placeholder) {
          mergedArgs[i] = newArgs[newArgIndex++];
        }
      }

      // Append remaining new arguments (if any left after filling placeholders)
      while (newArgIndex < newArgs.length) {
        mergedArgs.push(newArgs[newArgIndex++]);
      }

      // Count non-placeholder arguments
      const filledCount = mergedArgs.filter(
        (arg) => arg !== placeholder
      ).length;

      // If enough arguments collected (non-placeholder), call fn
      if (filledCount >= fn.length) {
        return fn.apply(this, mergedArgs);
      } else {
        // Otherwise, return a new curried function
        return curried(...mergedArgs);
      }
    };
  }

  // Start with empty argument list
  return curried();
}

// Define placeholder
curry.placeholder = Symbol("curry placeholder");

// Example usage:
const _ = curry.placeholder;
const sum3 = (a, b, c) => a + b + c;
const curriedSum1 = curryWithPlaceholder(sum);

console.log(curriedSum1(1)(2)(3)); // 6
console.log(curriedSum1(_, 2)(1, 3)); // 6
console.log(curriedSum1(_, _, 3)(1)(2)); // 6
