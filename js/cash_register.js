const Cash_Register = (() => {
    let num1 = null;
    let num2 = null;
    let operation = null;
    let hasDecimal = false;
    let display = document.getElementById('display');
    const buttons = document.getElementsByTagName('button');
    
    for (let i = 0; i < buttons.length; i++) {
        let currButton = buttons[i];
        let buttonValue = currButton.innerHTML;
        if (Number.parseInt(buttonValue) || buttonValue == 0) {
            currButton.addEventListener('click', () => {
                updateDisplay(buttonValue);
            })
        } else if (buttonValue === '.') {
            currButton.addEventListener('click', () => {
                if (!hasDecimal) {
                    hasDecimal = true;
                    updateDisplay('.');
                } else
                    throw new IllegalFormatExpression('.');
            })
        } else if (buttonValue === 'clear') {
            currButton.addEventListener('click', () => {
                doClear(true);
            });
        } else if (buttonValue === '=') {
            currButton.addEventListener('click', doEquals);
        } else if (buttonValue === 'get balance') {
            currButton.addEventListener('click', () => {
                display.innerHTML = Calculator.getBalance().toFixed(2);
            })
        } else if (buttonValue === 'deposit cash') {
            currButton.addEventListener('click', () => {
                Calculator.deposit(Number.parseFloat(display.innerHTML));
                doClear(true);
            })
        } else if (buttonValue === 'withdraw cash') {
            currButton.addEventListener('click', () => {
                if (Number.parseFloat(display.innerHTML) < 0) {
                    doClear(true);
                    throw new IllegalArgumentException("Can't withdraw a negative amount");
                } else if (Number.parseFloat(display.innerHTML) > Calculator.getBalance()) {
                    doClear(true);
                    throw new IllegalArgumentException('Overdrawn');
                } else {
                    Calculator.withdraw(Number.parseFloat(display.innerHTML));
                    doClear(true);
                }
            })
        } else {
            currButton.addEventListener('click', () => {
                handleOperation(buttonValue);
            })
        }
    }

    return {
        num1: num1,
        num2: num2,
        operation: operation,
        hasDecimal: hasDecimal,
        display: display
    }
})();

function updateDisplay(num) {
    if (Cash_Register.display.innerHTML === '0' && num !== '.') {
        if (num === '00' || num === '0')
            return;
        else 
            Cash_Register.display.innerHTML = num;
    }
    else
        Cash_Register.display.innerHTML += num;
}

function doClear(reset) {
    if (reset) {
        Cash_Register.num1 = null;
        Cash_Register.num2 = null;
        Cash_Register.operation = null;
    }
    Cash_Register.display.innerHTML = '0';
    Cash_Register.hasDecimal = false;
}

function handleOperation(operator) {
    if (Cash_Register.operation === null)
        Cash_Register.num1 = Cash_Register.display.innerHTML;    
    Cash_Register.operation = operator;
    doClear();
}

function doEquals() {
    Cash_Register.num2 = Cash_Register.display.innerHTML;
    let operand1 = Number.parseFloat(Cash_Register.num1);
    let operand2 = Number.parseFloat(Cash_Register.num2);
    if (Cash_Register.operation === '+') {
        Cash_Register.display.innerHTML = Calculator.add(operand1, operand2);
        console.log(Cash_Register.display);
    } else if (Cash_Register.operation === '-') {
        Cash_Register.display.innerHTML = Calculator.subtract(operand1, operand2);
    } else if (Cash_Register.operation === '*') {
        Cash_Register.display.innerHTML = Calculator.multiply(operand1, operand2);
    } else if (Cash_Register.operation === '/') {
        Cash_Register.display.innerHTML = Calculator.divide(operand1, operand2);
    } else {
    }

    Cash_Register.operation = null;
    Cash_Register.num1 = null;
    Cash_Register.num2 = null;
}

function IllegalFormatExpression(arg) {
    if (arg === '.')
        console.log("Can't have two '.' in a number!");
}

function IllegalArgumentException(message) {
    console.log(message);
}