//CHECK IN SOURCES IN BROWSER AND USE DEBUGGER

/*var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var square2 = square(n);
var square3 = square(4); */

// HOISTING (VARIABLES AND FUNCTIONS)

/*
var and function declaration are hoisted due to memory creation phase 
but if it was a function expression let/const/var = f() we ll get typeError, getName is not a function
*/

/* getName(); // Namaste Javascript
console.log(x); // undefined
var x = 7;
function getName() {
  console.log("Namaste Javascript");
} */

//at global level this === window
//never assign undefined to any variable

//CLOSURES

/*
function z() {
  var b = 100;
  function x() {
    var a = 200;
    function y() {
      console.log(a, b);
    }
    return y;
  }
  return x;
}
z()()();
*/

//Q2
/*  here replace var with let
function x() {
  for (var(use let) i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("Namaste Javascript");
}
x();
*/
/*
function x() {
  for (var i = 1; i <= 5; i++) {
    function close(i) {
      setTimeout(function () {
        console.log(i);
      }, i * 1000);
    }
    close(i);
  }
  console.log("Namaste Javascript");
}
x();
*/

/*
let a = 1;
setTimeout(() => {
  a = 2;
  setTimeout(() => console.log(a), 100);
}, 300);
setTimeout(() => console.log(a), 200);
//WHY ?
*/
//PROMISES
/*
const data = ["ram", "bam", "shyam"];

const promise = createID(data);

console.log(promise);
promise
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.log("1st catch:", error);
  })
  .then((data) => {
    console.log(data);
    return paymentID(data);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    //const error = new Error("This is a error");
    console.log("2nd catch", error);
  });

function createID(data) {
  const p = new Promise((resolve, reject) => {
    let res = true;
    if (res) {
      setTimeout(() => {
        resolve([...data, "PROMISE RELOVED"]);
      }, 5000);
    } else {
      setTimeout(() => {
        const error = new Error("This Promise is rejected");
        reject(error);
      }, 2000);
    }
  });
  return p;
}

function paymentID(data) {
  const p = new Promise((resolve, reject) => {
    //data = false;
    if (data) {
      resolve(data[0] + "1245");
    } else {
      const error = new Error("No Payment ID");
      reject(error);
    }
  });
  return p;
}
*/
