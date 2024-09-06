const root = document.documentElement;
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const themeToggleIcon = document.querySelector("#theme-toggle-btn > img");
themeToggleBtn.addEventListener ("click", toggleTheme);

if (localStorage.getItem("theme") == "dark") {
    themeToggleIcon.src = "./icons/sun.svg";
    themeToggleIcon.alt = "toggle_light_mode";
    root.classList.toggle("light");
    root.classList.toggle("dark");
} else {
    localStorage.setItem("theme", "light");
}

function toggleTheme() {
    root.classList.toggle("light");
    root.classList.toggle("dark");
    if (localStorage.getItem("theme") === "light") {
        themeToggleIcon.src = "./icons/sun.svg";
        themeToggleIcon.alt = "toggle_light_mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleIcon.src = "./icons/moon.svg";
        themeToggleIcon.alt = "toggle_dark_mode";
        localStorage.setItem("theme", "light");
    }
}

let operator = "";
let operand1 = "";
let operand2 = "";
let expression = "";
let isOperationDone = false;
const upperDisplay = document.querySelector(".upper");
const lowerDisplay = document.querySelector(".lower");

const numbers = document.querySelector(".numbers");
numbers.addEventListener ("click", (e) => {
    if (e.target.id) {
        if (!operator) {
            if (!(e.target.id === "." && operand1.includes("."))) {
                operand1 += e.target.id;
                lowerDisplay.textContent = operand1;
                upperDisplay.textContent = "";
            }
        } else {
            if (!(e.target.id === "." && operand2.includes("."))) {
                if (!isOperationDone) {
                    operand2 += e.target.id;
                    lowerDisplay.textContent = operand2;
                    upperDisplay.textContent = operand1 + operator;
                } else {
                    operand1 = e.target.id;
                    operand2 = "";
                    operator = "";
                    lowerDisplay.textContent = operand1;
                    upperDisplay.textContent = "";
                    isOperationDone = false;
                }
            }
        }
    }
});

const operators = document.querySelectorAll(".operator");
for (op of operators) {
    op.addEventListener ("click", (e) => {
        if (e.target.id && operand1) {
            if ((!operator || !operand2) && e.target.id !== "=") {
                operator = e.target.id;
                lowerDisplay.textContent = operand1 + operator;
            } else if (operator && operand2) {
                upperDisplay.textContent = operand1 + operator + operand2;
                if (e.target.id === "=") {
                    isOperationDone = false;
                }
                if (!isOperationDone) {
                    operand1 = operate(operator, operand1, operand2);
                }
                if (e.target.id !== "=") {
                    operand2 = "";
                    operator = e.target.id;
                    lowerDisplay.textContent = operand1 + operator;
                    if (isOperationDone) {
                        upperDisplay.textContent = "";
                    }
                    isOperationDone = false;
                } else {
                    lowerDisplay.textContent = operand1;
                    isOperationDone = true;
                }
            }
        }
    });
}

const actions = document.querySelector(".actions");
actions.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "ac":
            operator = "";
            operand1 = "";
            operand2 = "";
            lowerDisplay.textContent = "";
            upperDisplay.textContent = "";
            isOperationDone = false;
            break;
        case "+/-":
            if (operand2 && !isOperationDone) {
                operand2 = operand2 * -1;
                lowerDisplay.textContent = operand2;
            } else if (operand1) {
                operand1 = operand1 * -1;
                lowerDisplay.textContent = operand1;
            }
            if (!operand2 && !isOperationDone) {
                lowerDisplay.textContent += operator;
            }
            if (isOperationDone) {
                operator = "";
                operand2 = "";
                upperDisplay.textContent = "";
                isOperationDone = false;
            }
            break;
        case "%":
            break;
    }
});

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
