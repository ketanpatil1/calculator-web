const root = document.documentElement;
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
themeToggleBtn.addEventListener ("click", toggleTheme);

if (localStorage.getItem("theme") == "dark") {
    root.classList.toggle("light");
    root.classList.toggle("dark");
} else {
    localStorage.setItem("theme", "light");
}

function toggleTheme() {
    root.classList.toggle("light");
    root.classList.toggle("dark");
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

let operator = "";
let operand1 = "";
let operand2 = "";
let expression = "";
let operationDone = false;
const upperDisplay = document.querySelector(".upper");
const lowerDisplay = document.querySelector(".lower");

function isOperatorPresent() {
    return Boolean(operator);
}
function isOperationDone() {
    return operationDone;
}

function containsDecimal(number) {
    return number.includes(".");
}

const numbers = document.querySelectorAll(".number");
for (const number of numbers) {
    number.addEventListener ("click", (e) => {
        if (isOperatorPresent()) {
            if (isOperationDone()) {
                operand1 = number.id;
                operand2 = "";
                operator = "";
                lowerDisplay.textContent = operand1;
                upperDisplay.textContent = "";
                operationDone = false;
            } else {
                operand2 += number.id;
                lowerDisplay.textContent = operand2;
                upperDisplay.textContent = operand1 + operator;
            }
        } else {
            upperDisplay.textContent = "";
            operand1 += number.id;
            lowerDisplay.textContent = operand1;
        }
    });
}

const decimalBtn = document.getElementById(".");
decimalBtn.addEventListener("click", () => {
    if (isOperatorPresent()) {
        if (!containsDecimal(operand2)) {
            if (!operand2) {
                operand2 = "0";
            }
            operand2 += ".";
            upperDisplay.textContent = operand1 + operator;
            lowerDisplay.textContent = operand2 + "0";
        }
    } else {
        if (!containsDecimal(operand1)) {
            if (!operand1) {
                operand1 = "0";
            }
            operand1 += ".";
            lowerDisplay.textContent = operand1 + "0";
        }
    }
})

// TODO: fix consecutive "." and operator
const operators = document.querySelectorAll(".operator");
for (const op of operators) {
    op.addEventListener ("click", (e) => {
        if (operand1) {
            if ((!operator || !operand2)) {
                operator = op.id;
                lowerDisplay.textContent = operand1 + operator;
            } else if (operator && operand2) {
                if (isOperationDone()) {
                    upperDisplay.textContent = "";
                } else {
                    upperDisplay.textContent = operand1 + operator + operand2;
                    operand1 = operate(operator, operand1, operand2);
                }
                operand2 = "";
                operator = op.id;
                lowerDisplay.textContent = operand1 + operator;
                operationDone = false;
            }
        }
    });
}

const equalsBtn = document.getElementById("=");
equalsBtn.addEventListener("click", () => {
    if (operand2) {
        upperDisplay.textContent = operand1 + operator + operand2;
        operand1 = operate(operator, operand1, operand2);
        lowerDisplay.textContent = operand1;
        operationDone = true;
    }
});

const actions = document.querySelectorAll(".action");
for (const action of actions) {
    action.addEventListener("click", (e) => {
        switch (action.id) {
            case "ac":
                operator = "";
                operand1 = "";
                operand2 = "";
                lowerDisplay.textContent = "";
                upperDisplay.textContent = "";
                operationDone = false;
                break;
            case "+/-":
                if (!isOperationDone()) {
                    if (operand2.length) {
                        operand2 = (operand2 * -1).toString();
                        lowerDisplay.textContent = operand2;
                    } else {
                        operand1 = (operand1 * -1).toString();
                        lowerDisplay.textContent = operand1 + operator;
                    }
                } else {
                    operator = "";
                    operand1 *= -1;
                    operand2 = "";
                    upperDisplay.textContent = "";
                    lowerDisplay.textContent = operand1 + operator;
                    operationDone = false;
                }
                break;
        }
    });
}

function add (num1, num2) {
    return +num1 + +num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function percentage (num1, num2=1) {
    return (num1 / 100) * num2;
}

function operate(op, num1, num2) {
    switch (op) {
        case '+':
            return add (num1, num2);
        case '-':
            return subtract (num1, num2);
        case '*':
            return multiply (num1, num2);
        case '/':
            return divide (num1, num2);
        case '%':
            return percentage (num1, num2);
        default:
            console.log("Operator not recognized: " + op);
            return "error";
    }
}
