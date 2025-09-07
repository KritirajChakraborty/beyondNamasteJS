//Event bubbling & capturing/ trickling
//bubbling goes from target element and bubbles up in the hierarchy
//whereas capturing/trickling starts from the top and trickes down to the target element
//by default W3C says bubbling is default but we can use capturing using a boolean value in the 3rd parameter of any event listener ("click",()=> {}, useCapture)
//first an event trickles down and then it bubbles up
document.querySelector("#grandparent").addEventListener(
  "click",
  (e) => {
    console.log("Grandparent clicked!");
    e.stopPropagation();
  },
  true
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("Parent clicked!");
    //e.stopPropagation();
  },
  true
);
document.querySelector("#child").addEventListener(
  "click",
  (e) => {
    console.log("Child clicked!");
    //e.stopPropagation();
  },
  true
);
//play with true/false above to undestand
//EVENT DELEGATION:- Attaching a single event listener to a parent element to handle events for all of its child elements (present now or added later), by relying on event bubbling.
//Instead of adding individual listeners to each child, you “delegate” the handling to their ancestor.
//below we are not attaching event listeners to every LI but only parent so when click is bubbled up we use it
document.querySelector("#menu").addEventListener("click", (e) => {
  console.log(e.target.innerText);
  if (e.target.tagName == "LI") {
    window.location.href = "/" + e.target.innerText;
  }
});
