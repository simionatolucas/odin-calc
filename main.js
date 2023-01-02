const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const point = document.querySelector(".point");

const AC = document.querySelector("#AC");
const backspace = document.querySelector("#backspace");
const equals = document.querySelector("#equals");

let displayCurrent = document.querySelector("#current");
let displayPrevious = document.querySelector("#previous");

let currentOperation = "";
let firstOperand = 0;
let secondOperand = 0;
let result = 0;
let shouldReset = false;
let pointAdded = false;

numbers.forEach(function(number) {
    number.addEventListener('click', () => {
        if (shouldReset) {
            clear();
            shouldReset = false;
        }

        if (displayCurrent.textContent.toString().length < 11) {
            displayCurrent.textContent += number.textContent;
        }
    });
});

operations.forEach(function(operation) {
    operation.addEventListener("click", () => {
        if (displayCurrent.textContent == "") {
            return;
        }

        if (displayPrevious.textContent && shouldReset == false) {
            secondOperand = parseFloat(displayCurrent.textContent);
            result = Math.round(operate(currentOperation, firstOperand, secondOperand) * 100) / 100;
            displayCurrent.textContent = result;
        }
   
        currentOperation = operation.textContent;
        firstOperand = parseFloat(displayCurrent.textContent);
        displayPrevious.textContent = `${firstOperand} ${currentOperation}`
        displayCurrent.textContent = "";
        shouldReset = false;
        pointAdded = false;
    });
})

point.addEventListener("click", () => {
    if (pointAdded) {
        return;
    }

    displayCurrent.textContent += ".";
    pointAdded = true;
});

equals.addEventListener("click", () => {
    if (!displayCurrent.textContent) {
        return;
    }

    secondOperand = parseFloat(displayCurrent.textContent);
    displayPrevious.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    result = Math.round(operate(currentOperation, firstOperand, secondOperand) * 100) / 100;

    if (result.toString().length > 11) {
        displayCurrent.textContent = result.toExponential(2);
    } else {
        displayCurrent.textContent = result;
    }
    
    shouldReset = true;
});

AC.addEventListener("click", clear);

backspace.addEventListener("click", () => {
    if (shouldReset == true) {
        clear();
    }

    prev = displayCurrent.textContent;
    displayCurrent.textContent = prev.slice(0, -1);
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b); 
    }
}

function clear() {
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
    shouldReset = false;
    pointAdded = false;
    displayCurrent.textContent = "";
    displayPrevious.textContent = "";
    currentOperation.textContent = "";
}

// TODO
// * Limitar tamaño del resultado (usar notación científica?)
// ----------- No deberían poder colocarse múltiples puntos
// ----------- Backspace
// ----------- Operaciones encadenadas no funcionan sin antes apretar el =
// ----------- La operación previa se borra al apretar un número luego de apretar el =