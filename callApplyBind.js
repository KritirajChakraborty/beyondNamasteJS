const person = {
  name: "Kriti",
  age: 25,
  printName: function (state, country) {
    console.log("name: " + this.name + " age: " + this.age);
    //adding below to see params of call,apply and bind
    console.log(state + ", " + country);
  },
};

//person.printName();

const person1 = {
  name: "Raj",
  age: 100,
};

//person1.printName(); //error: printName not a function
//So should we write printName inside every person object we create?
//No. here comes function borrowing in picture. call,apply and bind. See below

//call takes 1st arguement for context of the object(this-where should point)
person.printName.call(person1, "Assam", "India");
//apply is same but instead takes the function params as a arrays
person.printName.apply(person1, ["Assam 2", "India 2"]);
//bind also does the same but it returns a function which we can execute according to our convenience
const newPrint = person.printName.bind(person1, "Assam 3", "India 3");
newPrint();
//we can call bind like this also
const newPrint1 = person.printName.bind(person1, "Assam 4");
newPrint1("India 4");
