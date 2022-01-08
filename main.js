import { add, subtract, multiply, divide } from "/modules/calc.js";

function equals() { 
  const num1 = parseFloat(display.num1);
  const num2 = parseFloat(display.num2);
  return operate(display.operation, num1, num2);
}

function esc() {
  display.num1 = null;
  display.num2 = null;
  display.operation = null;
  display.opSelected = false;
  display.result = null;
}

const ops = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "=": equals,
  "esc": esc,
  ".": "dot"
};

const display = {
    num1: null,
    num2: null,
    opSelected: false,
    operation: null,
    result: null
}

function operate(op, num1, num2) {
    if (!ops[op]) return "Error";
    return ops[op](num1, num2);
}

const container = document.getElementById('container');
const displayView = document.getElementById('display');

function updateDisplay(num) {
  displayView.textContent = num;
}

let btn;

// Calculator keys
for (let i=0; i<10; i++) {
    btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add('btn-calc');
    btn.textContent = i;
    btn.setAttribute('id', `b${i}`);
    btn.setAttribute("num", i);
    container.appendChild(btn);
}


// Operation keys
for (const i in ops) {
  btn = document.createElement("button");
  btn.classList.add('btn');
  btn.classList.add("btn-op");
  btn.textContent = i;
  btn.setAttribute("id", `bop-${Object.keys(ops).indexOf(i)}`);
  btn.setAttribute("op", `${i}`);
  container.appendChild(btn);
}

// Add event listeners
const calcKeys = document.querySelectorAll('.btn-calc');
console.log(calcKeys);
calcKeys.forEach((element) => {
    element.addEventListener('click', (e) => {
        const key = e.target.getAttribute("num");
        if (display.num1 == null && display.num2 == null) {
            display.num1 = `${key}`;
            updateDisplay(display.num1);
        } else if (display.num2 == null && !display.opSelected) {
            display.num1 += `${key}`;
            updateDisplay(display.num1);
        } else if (display.num2 == null && display.opSelected) {
            display.num2 = `${key}`;
            updateDisplay(display.num2);
        } else if (display.opSelected) {
            display.num2 += `${key}`;
            updateDisplay(display.num2);
        }
        // console.log(display);
    });
});

const opKeys = document.querySelectorAll(".btn-op");
console.log(opKeys);
opKeys.forEach((element) => {
  element.addEventListener("click", (e) => {
    const operation = e.target.getAttribute("op");
    if (display.num1 == null && display.num2 == null) {
      if (operation == ".") {
        display.num1 = "0."
        updateDisplay(display.num1);
      }
    } else if (display.num2 == null && !display.opSelected) {
        if (operation == ".") {
          display.num1 += "."
          updateDisplay(display.num1);
        } else {
          display.opSelected = true;
          display.operation = operation;
        }
    } else if (display.num2 == null && display.opSelected) {
        display.num2 = "0."
        updateDisplay(display.num2);
    } else if (operation == ".") {
      display.num2 += ".";
      updateDisplay(display.num2);
    } else if (operation == "=") {
        display.result = equals();
        display.num1 = null;
        display.num2 = null;
        display.operation = null;
        display.opSelected = false;
        updateDisplay(display.result);
    }
    // console.log(display);
  });
});