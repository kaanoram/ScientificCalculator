const outputOperationElement = document.querySelector('.operation .value');
const outputResultElement = document.querySelector('.result .value');
const inputElement = document.querySelector('.input');

const POWER = "POWER(";
const FACTORIAL = "FACTORIAL(";
const OPERATORS = ["+", "-", "*", "/"];
let data = {
    operation: [],
    formula: [],
};
let ans;

let calculatorButtons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "mathFunction"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "mathFunction"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : ["trigo","(","Math.cos,"],
        type : "trigoFunction"
    },{
        name : "sin",
        symbol : "sin",
        formula : ["trigo","(","Math.sin,"],
        type : "trigoFunction"
    },{
        name : "tan",
        symbol : "tan",
        formula : ["trigo","(","Math.tan,"],
        type : "trigoFunction"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : ["invTrigo","(","Math.acos,"],
        type : "trigoFunction"
    },{
        name : "asin",
        symbol : "asin",
        formula : ["invTrigo","(","Math.asin,"],
        type : "trigoFunction"
    },{
        name : "atan",
        symbol : "atan",
        formula : ["invTrigo","(","Math.atan,"],
        type : "trigoFunction"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "x!",
        formula : FACTORIAL,
        type : "mathFunction"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "mathFunction"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "mathFunction"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "mathFunction"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "xʸ",
        formula : POWER,
        type : "mathFunction"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

function createCalculatorButton() {

    const buttonsPerRow = 8;
    let addedButtons = 0;
    // this loop will create 8 buttons in 5 rows each so in total 8*5 = 40 buttons,each row 8 buttons

    calculatorButtons.forEach((button) => {
        if (addedButtons % buttonsPerRow === 0) {
            const row = document.createElement('div');
            row.classList.add("row");
            inputElement.appendChild(row);
        }

        const currentRow = document.querySelector(".row:last-child");
        const currentButton = document.createElement('button');
        currentButton.id = `${button.name}`;
        currentButton.textContent = `${button.symbol}`;
        currentRow.appendChild(currentButton);
        addedButtons++;
    });
}

function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

function factorial(number) {

    // if the number is decimal like 0.5! or so then call the gamma function
    if (number % 1 != 0) {
        return gamma(number + 1);
    }
    if (number === 0 || number === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
        if (result == Infinity) return Infinity;
    }
    return result;
}

function calculator(button) {
    if (button.type == 'operator') {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }else if (button.type == 'number') {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }else if (button.type == 'trigoFunction') {
        data.operation.push(button.symbol);
        data.operation.push('(');
        for (let item of button.formula) {
            data.formula.push(item);
        }
    }else if (button.type == 'mathFunction') {
        let symbol, formula;
        if (button.name == 'factorial') {
            symbol = "!";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == 'power') {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == 'square') {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2");
            data.formula.push("2");
            data.operation.push(")");
            data.formula.push(")");
        } else if (button.name == 'ln') {
            symbol = "ln(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.formula.push('(');
        } else if (button.name == 'log') {
            symbol = 'log(';
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.formula.push('(');
        } else if (button.name == 'exp') {
            symbol = 'exp(';
            formula = button.formula
            data.operation.push(symbol);
            data.formula.push(formula);
            data.formula.push('(');
        } else {
            symbol = button.symbol;
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("(");
            data.formula.push("(");
        }
    }
    else if (button.type === 'key') {
        if (button.name === 'clear') {
            data.operation = [];
            data.formula = [];
            updateOutputResult(0);
        } else if (button.name === 'delete') {
            data.operation.pop();
            data.formula.pop();
        } else if (button.name === 'rad') {
            RADIAN = true;
            angleToggle();
        } else if (button.name === 'deg') {
            RADIAN = false;
            angleToggle();
        }
    }
    else if (button.type == 'calculate') {
        formulaStr = data.formula.join('');
        let powerSearchResult = search(data.formula, POWER);
        let factorialSearchResult = search(data.formula, FACTORIAL);
        const BASES = powerbaseGetter(data.formula, powerSearchResult);
        BASES.forEach(base => {
            let toreplace = base + POWER
            let replacement = "Math.pow(" + base + ",";
            formulaStr = formulaStr.replace(toreplace, replacement);
        });
        const NUMBERS = factorialNumGetter(data.formula, factorialSearchResult);
        NUMBERS.forEach(number => {
            formulaStr = formulaStr.replace(number.toReplace,
                number.replacement);
        });
        console.log(formulaStr);
        let result;
        try {
            result = eval(formulaStr);
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "SyntaxError";
                updateOutputResult(result);
                return;
            }
        }
        ans = result;
        data.operation = [result];
        data.formula = [result];
        updateOutputResult(result);
        return;
    }
    updateOutputOperation(data.operation.join(''));
}

function factorialNumGetter(formula, factorialSearchResult) {
    let numbers = [];
    let factorialSequence = 0;
    factorialSearchResult.forEach(factIndex => {
        let number = [];
        let nextIndex = factIndex + 1;
        let nextInput = formula[nextIndex];
        if (nextIndex == FACTORIAL) {
            factorialSequence += 1;
            return;
        }
        let firstFactIndex = factIndex - factorialSequence;
        let prevIdx = firstFactIndex - 1;
        let parentCount = 0;
        while (prevIdx >= 0) {
            if (formula[prevIdx] == '(') {
                parentCount -= 1;
            }
            if (formula[prevIdx] == ')') {
                parentCount += 1;
            }
            let isOperator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[prevIdx] == OPERATOR) {
                    isOperator = true;
                }
            });
            if (isOperator && parentCount == 0) {
                break;
            }
            number.unshift(formula[prevIdx])
            prevIdx--;
        }
        let numberStr = number.join('');
        const factorial = "factorial(",
            closeParen = ')';
        let times = factorialSequence + 1;
        let toReplace = numberStr + FACTORIAL.repeat(times);
        let replacement = factorial.repeat(times) + numberStr + closeParen;
        numbers.push({
            toReplace: toReplace,
            replacement: replacement
        });
        factorialSequence = 0;
    })
    return numbers;
}

function powerbaseGetter(formula, powerSearchResult) {
    let powersBase = [];
    powerSearchResult.forEach(powerIndex => {
        let base = [];
        let parentCount = 0;
        let prevIdx = powerIndex - 1;
        while (prevIdx >= 0) {
            if (formula[prevIdx] === '(') {
                parentCount -= 1;
            }
            if (formula[prevIdx] === ')') {
                parentCount += 1;
            }
            let isOperator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[prevIdx] === OPERATOR) {
                    isOperator = true;
                }
            });
            let isPower = formula[prevIdx] === POWER;
            if ((isOperator && parentCount === 0) || isPower) {
                break;
            }
            base.unshift(formula[prevIdx])
            console.log(base);
            prevIdx--;
        }
        powersBase.push(base.join(''));
        console.log(powersBase);
    })
    return powersBase;
}

// SEARCH FUNCTION

function search(array, keyword) {
    let searchRes = [];
    array.forEach((element, index) => {
        if (element == keyword) {
            searchRes.push(index);
        }
    });
    return searchRes;
}

function updateOutputOperation(operation) {
    outputOperationElement.innerHTML = operation;
}

function updateOutputResult(result) {
    outputResultElement.innerHTML = result;
}

function trigo(callback, angle) {
    if (!RADIAN) {
        angle = angle * Math.PI / 180;
    }
    return callback(angle);
}

function invTrigo(callback, value) {
    let angle = callback(value);
    if (!RADIAN) {
        angle = angle * 180 / Math.PI;
    }
    return angle;
}

// On Load
createCalculatorButton();

let RADIAN = true;
const radBtn = document.getElementById('rad');
const degBtn = document.getElementById('deg');

// by default select the Rad button
radBtn.classList.add("active-angle");

// this function is used to toggle between 2 buttons i.e if someone clicks on the "deg" button then deg button must be activated,else if someone clicks on the rad button then it must be activated,so to perform those kind of actions i need to use the toggle method present in the classList as shown 
function angleToggle() {
    radBtn.classList.toggle("active-angle");
    degBtn.classList.toggle("active-angle");
}

// adding event listener
inputElement.addEventListener('click', event => {
    const targetBtn = event.target;
    calculatorButtons.forEach(button => {
        if (button.name == targetBtn.id) {
            calculator(button);
        }
    });
});

