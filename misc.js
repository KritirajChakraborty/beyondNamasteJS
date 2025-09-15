//Q Flatten deeply nested array

function flattenArray(arr) {
  return arr.reduce((accu, curr) => {
    if (Array.isArray(curr)) {
      accu.push(...flattenArray(curr));
    } else {
      accu.push(curr);
    }
    return accu;
  }, []);
}
const a = [[[[1, 2], 3], 4, 5], [[6, 7], 8], [9], 10];
console.log(a);
console.log("Flattened array: ", flattenArray(a));

//Q Flaten deeply nested object

function flattenObject(obj, parent) {
  const finalObj = {};
  function generateObj(object, parent) {
    for (let key in object) {
      const newParent = parent + key;
      const value = object[key];
      if (typeof value === "object" && value !== null) {
        generateObj(value, newParent + ".");
      } else {
        finalObj[newParent] = value;
      }
    }
  }
  generateObj(obj, parent);
  return finalObj;
}

const obj = {
  a: "12",
  b: 23,
  c: { d: { e: 10, f: "120" }, g: false },
  h: {
    i: [2, 5],
  },
};
console.log(obj);
console.log("Flattened object: ", flattenObject(obj, ""));

//Q Shallow copy and deep copy
// shallow copy only copied the fist level but points to the same referance for deeply nested array and objects

//FOR ARRAYS
let arr = [2, 3, [4, 5]];
const arrCopy = arr.slice(); // or [...arr]

//shallow copy
console.log(arr);
console.log(arrCopy);
arrCopy[0] = 100;
arrCopy[2][1] = 500;
console.log(arr);
console.log(arrCopy);

//deep copy
arr = [2, 3, [4, 5]];
const arrDeep = JSON.parse(JSON.stringify(arr));
arrDeep[2][1] = 150;
console.log(arr);
console.log(arrDeep);

//OBJECTS
let ob = { a: 1, b: { c: 5 } };
const obCopy = Object.assign({}, ob); // or {...ob}

//shallow copy
console.log(ob);
console.log(obCopy);
obCopy.a = 25;
obCopy.b.c = 15;
console.log(ob);
console.log(obCopy);

//deep copy same as above using JSON.parse and JSON.stringify

//Q write own function to deeply copy arrays/objects
//this is not for Map,Set,Date, Regex

function deepCopy(ob) {
  if (typeof ob == null || typeof ob !== "object") {
    return ob;
  }

  //for array
  if (Array.isArray(ob)) {
    const arr = [];
    for (let i = 0; i < ob.length; i++) {
      if (Array.isArray(ob[i])) {
        arr[i] = deepCopy(ob[i]);
      } else {
        arr[i] = ob[i];
      }
    }
    return arr;
  }
  //for object
  if (typeof ob === "object") {
    const obj = {};
    for (let key in ob) {
      if (ob[key] === "object") {
        obj[key] = deepCopy(ob[key]);
      } else {
        obj[key] = ob[key];
      }
    }
    return obj;
  }
}

const ans = [1, 2, [3, 4, [5, 6], 7], 8];
const deepAns = deepCopy(ans);
console.log("Original:", ans);
console.log("Deep copy:", deepAns);

const obj1 = {
  a: "12",
  b: 23,
  c: { d: { e: 10, f: "120" }, g: false },
  h: {
    i: [2, 5],
  },
};
const deepObj = deepCopy(obj1);
console.log("Original:", obj1);
console.log("Deep copy:", deepObj);

//PIPE AND COMPOSITE FUCTIONS

const addby2 = (x) => x + 2;
const subby1 = (x) => x - 1;
const mulby5 = (x) => x * 5;

//compose: right -> left
function compose(...fns) {
  return function (initialValue) {
    // return fns.reduceRight((acc, fn) => {
    //   return fn(acc);
    // }, initialValue);

    //better es6 way
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}
console.log(mulby5(subby1(addby2(5))));
const res = compose(mulby5, subby1, addby2);
console.log(res(5));

//pipe is the opposite of compose: left -> right
const pipe = function (...fns) {
  return function (initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
};
console.log(addby2(subby1(mulby5(5))));
const res2 = pipe(mulby5, subby1, addby2);
console.log(res2(5));
