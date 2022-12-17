const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

const AC = document.querySelector("#AC");
const backspace = document.querySelector("#backspace");
const equals = document.querySelector("#equals");

let displayCurrent = document.querySelector("#current");
let displayPrevious = document.querySelector("#previous");

let currentOperation = "";
let firstOperand = 0;
let secondOperand = 0;
let result = 0;

numbers.forEach(function(number) {
    number.addEventListener('click', () => {
        if (displayCurrent.textContent.toString().length < 11) {
            displayCurrent.textContent += parseInt(number.textContent);
        }
    });
});

operations.forEach(function(operation) {
    operation.addEventListener("click", () => {
        currentOperation = operation.textContent;
        firstOperand = parseInt(displayCurrent.textContent);
        displayPrevious.textContent = `${firstOperand} ${currentOperation}`
        displayCurrent.textContent = "";
    });
})

equals.addEventListener("click", () => {
    secondOperand = parseInt(displayCurrent.textContent);
    displayPrevious.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    result = operate(currentOperation, firstOperand, secondOperand);
    console.log(result);
    displayCurrent.textContent = result;
});

AC.addEventListener("click", () => {
    displayCurrent.textContent = "";
    displayPrevious.textContent = "";
    result = 0;
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

// const divideBtn = document.querySelector("#divide");
// divideBtn.addEventListener("click", () => {
//     a = parseInt(display.textContent);
//     display.textContent = "";
// });

// const multiplyBtn = document.querySelector("#multiply");
// multiplyBtn.addEventListener("click", () => {
//     a = parseInt(display.textContent);
//     display.textContent = "";
// });

// const subtractBtn = document.querySelector("#subtract");
// subtractBtn.addEventListener("click", () => {
//     a = parseInt(display.textContent);
//     display.textContent = "";
// });

// const sumBtn = document.querySelector("#sum");
// sumBtn.addEventListener("click", () => {
//     a = parseInt(display.textContent);
//     display.textContent = "";
// });

// const equalsBtn = document.querySelector("#equals");
// equalsBtn.addEventListener("click", () => {
//     b = parseInt(display.textContent);
//     display.textContent = "";
//     display.textContent = operate(operation, a, b);
// });






// al momento de calcular podemos obtener lo que está escrito en el display y convertirlo a int / float
// los numeros en el display deberían ser un array? para poder hacer push y pop
