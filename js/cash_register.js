let num1 = null;
let num2 = null;
let operation = null; // stores the operation (`+, -, *, /`)
const display = document.getElementById('display');
const buttons = document.getElementsByTagName('button');

// adds event listeners to each of the buttons
for (let i = 0; i < buttons.length; i++) {
    let currButton = buttons[i];
    let buttonValue = currButton.innerHTML;

    if (Number.parseInt(buttonValue) || buttonValue == 0 || buttonValue === '.') { // buttons `00-9` and `.`
        currButton.addEventListener('click', () => {
            updateDisplay(buttonValue);
        })
    } else if (buttonValue === 'clear') { // `clear` button
        currButton.addEventListener('click', () => {
            doClear(true);
        });
    } else if (buttonValue === '=') { // `=` button
        currButton.addEventListener('click', doEquals);
    } else if (buttonValue === 'get balance') { // `get balance` button
        currButton.addEventListener('click', () => {
            display.innerHTML = Calculator.getBalance().toFixed(2);
        })
    } else if (buttonValue === 'deposit cash') { // `deposit cash` button
        currButton.addEventListener('click', doDeposit);
    } else if (buttonValue === 'withdraw cash') { // `withdraw cash` button
        currButton.addEventListener('click', doWithdraw);
    } else { // operation buttons `+, -, *, /`
        currButton.addEventListener('click', () => {
            handleOperation(buttonValue);
        })
    }
}

/**
 * Adds the given number to the display
 * @param num => number or . to be added to display 
 */
function updateDisplay(num) {
    if (display.innerHTML === '0' && num !== '.') {
        if (num === '00' || num === '0')
            return;
        else
            display.innerHTML = num;
    } else {
        try {
            if (num === '.')
                if (display.innerHTML.includes('.'))
                    throw `Can't have two '.' in a number`;
            display.innerHTML += num;
        } catch (e) {
            console.log(e);
        }
    }
}

/**
 * Clears the display. Will reset num1, num2, and operation if reset is provided
 * @param reset => true or false
 */
function doClear(reset) {
    if (reset) {
        num1 = null;
        num2 = null;
        operation = null;
    }
    display.innerHTML = '0';
}

/**
 * Sets the current operation to the operator value
 * @param operator => operator to be set `+, -, *, /` 
 */
function handleOperation(operator) {
    if (operation === null)
        num1 = display.innerHTML;
    operation = operator;
    doClear();
}

/**
 * Does the current operation and displays the result
 */
function doEquals() {
    num2 = display.innerHTML;
    let operand1 = Number.parseFloat(num1);
    let operand2 = Number.parseFloat(num2);
    if (operation === '+') {
        display.innerHTML = Calculator.add(operand1, operand2);
    } else if (operation === '-') {
        display.innerHTML = Calculator.subtract(operand1, operand2);
    } else if (operation === '*') {
        display.innerHTML = Calculator.multiply(operand1, operand2);
    } else if (operation === '/') {
        try {
            display.innerHTML = Calculator.divide(operand1, operand2);
        } catch (e) {
            console.log(e);
            doClear(true);
        }
    }

    num1 = null;
    num2 = null;
    operation = null;
}

/**
 * Deposits the currently displayed value to the cash register and clears the display
 */
function doDeposit() {
    try {
        Calculator.deposit(Number.parseFloat(display.innerHTML));
        doClear(true);
    } catch (e) {
        console.log(e);
        doClear(true);
    } 
}

/**
 * Withdraws the currently displayed value from the cash register and clears the display
 */
function doWithdraw() {
    try {
        Calculator.withdraw(Number.parseFloat(display.innerHTML));
        doClear(true);
    } catch (e) {
        console.log(e);
        doClear(true);
    }    
}

/**
 * Added keyboard functionality as follows:
 * Numbers '0-9'
 * '=' for Equals
 * All operands '*, /, +, -'
 * 'delete' for Clear
 * 'b' for Get Balance
 * 'd' for Deposit Cash
 * 'w' for Withdraw Cash
 */
document.addEventListener('keypress', function (event) {
    let char = String.fromCharCode(event.keyCode);
    if (Number.parseInt(char) || char === '0' || char === '.') // buttons `0-9` and `.`
        updateDisplay(char);
    else if (char === '+' || char === '-' || char === '*' || char === '/') // buttons representing operators `+, -, *, /`
        handleOperation(char);
    else if (char === '=') // `=` button
        doEquals();
    else if (char === 'b') // `b` button
        display.innerHTML = Calculator.getBalance().toFixed(2);
    else if (char === 'd') // `d` button
        doDeposit();
    else if (char === 'w') // `w` button
        doWithdraw();
})

// `keypress` can't recognize the delete key so had to use `keydown`
document.onkeydown = function (event) {
    if (event.keyCode == '8')
        doClear(true);
}