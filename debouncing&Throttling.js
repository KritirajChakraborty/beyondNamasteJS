//DEBOUNCING
//deboucing means to handle an event which is happening to often than the browser or dev can hamdle
//we impose 2 strict rules 1 between 1st and next call there will be a certain delay 2 if a function call happens before the delay, that fn has to await again for that certain time of delay

//BASIC DEBOUNCING
const debounce = function (callback, delay) {
  let timer = "";
  return function debouncedFn(...args) {
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(self, args);
    }, delay);
  };
};
const debouncedAPICall = debounce(makeApiCall, 2000);

//DEBOUNCING WITH LEADING AND TRAILING OPTIONS
function debounce2(func, delay, option = { leading: true, trailing: true }) {
  // Store the timer id returned by setTimeout
  let timer = null;

  // Keep track if we've already executed the function immediately (leading mode)
  let invokedLeading = false;
  // did new calls happen after leading?
  let hasPending = false;

  // Store the latest arguments and 'this' context for the function
  let lastArgs, lastThis;

  // Extract the options (leading and trailing)
  const { leading, trailing } = option;

  return function (...args) {
    // Save current arguments and context (for use in trailing execution)
    lastArgs = args;
    lastThis = this;

    // Leading Call
    // If leading is true AND there's no active timer,
    // call the function immediately
    if (leading && !timer) {
      func.apply(lastThis, lastArgs);
      // mark that we've fired the leading call
      invokedLeading = true;
      hasPending = false; //reset pending flag, no new calls yet
    } else {
      hasPending = true; // if not first call, mark pending for trailing
    }

    // Reset Timer
    // Cancel any previous scheduled execution
    clearTimeout(timer);

    // Start a new timer
    timer = setTimeout(() => {
      // When delay passes, reset the timer variable to allow new leading calls
      timer = null;

      // Trailing Call
      // Run function at the end if:
      // 1. trailing option is enabled
      // 2. AND (leading was off OR we already had a leading call)
      if (trailing && (!leading || hasPending)) {
        func.apply(lastThis, lastArgs); // call with latest args
      }

      // Reset state for the next event burst
      invokedLeading = false;
      hasPending = false;
    }, delay);
  };
}
const debouncedAPICall2 = debounce2(makeApiCall, 2000);

const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("input", () => {
  output.textContent = input.value;
  // makeApiCall();
  // debouncedAPICall();
  debouncedAPICall2();
});

function makeApiCall() {
  console.log("API call outgoing!");
}
//THROTTLING
const handleScroll = function () {
  console.log("Scroll event triggered!");
};

//BASIC THROTTLING WITH SETTIMEOUT
const throttle = function (cb, delay) {
  let waiting = false;

  // store the most recent call's arguments and context that happened during the wait
  let lastArgs = null;
  let lastThis = null;

  // return the throttled wrapper
  return function (...args) {
    const self = this; // preserve caller context

    // If not currently waiting, execute immediately (leading)
    if (!waiting) {
      func.apply(self, args); // call right away with current args/context
      waiting = true; // enter the throttle window

      // Start timer for the throttle window
      setTimeout(() => {
        waiting = false; // window ended, allow next leading call

        // If there was any call during the wait, run it now (trailing)
        if (lastArgs) {
          func.apply(lastThis, lastArgs); // execute with latest stored args/context
          lastArgs = null; // clear pending args
          lastThis = null; // clear pending context
        }
      }, wait);
    } else {
      // If we are waiting, stash the latest args/context for trailing execution
      lastArgs = args;
      lastThis = self;
    }
  };
};

//BASIC THROTTLING WITH DATE NOW
const throttle2 = function (cb, delay) {
  let lastCall = 0;
  return function throttledFunction() {
    let now = Date.now();
    if (now - lastCall >= delay) {
      cb();
      lastCall = now;
    }
  };
};
//THROTTLING WITH LEADING AND TRAILING OPTION
//Leading:- Invoke callback function immedietely after event
//Trailing:- Invoke callback after last event
const throttle3 = function (cb, delay, options = {}) {
  const { leading = true, trailing = true } = options;
  let lastCall = 0;
  let timer = "";
  return function throttledFunction(...args) {
    let now = Date.now();
    const self = this || window;

    //adding leading condition here
    if (!leading && lastCall == 0) {
      lastCall = now;
    }

    if (now - lastCall >= delay) {
      cb.apply(self, args);
      lastCall = now;
      //what if our this if block runs then because of no restrictions the else if will also run so to stop this we need to clear timer
      clearTimeout(timer);
      timer = "";
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        cb.apply(self, args);
        timer = "";
      }, delay);
    }
  };
};

//this is better code
function throttle4(func, wait, option = { leading: false, trailing: true }) {
  let waiting = false;
  let lastCallArgs = null;
  return function (...args) {
    if (!waiting) {
      waiting = true;
      if (option.leading === true) {
        func(...args);
      } else {
        lastCallArgs = args;
      }
      let timer = () =>
        setTimeout(() => {
          if (option.trailing && lastCallArgs) {
            func(...lastCallArgs);
            lastCallArgs = null;
            timer();
          } else {
            waiting = false;
          }
        }, wait);
      timer();
    } else {
      lastCallArgs = args;
    }
  };
}

// const manageScroll = throttle(handleScroll, 5000);
//const manageScroll = throttle2(handleScroll, 10000);
// const manageScroll = throttle3(handleScroll, 1000);
const manageScroll = throttle4(handleScroll, 1000);
window.addEventListener("scroll", manageScroll);
