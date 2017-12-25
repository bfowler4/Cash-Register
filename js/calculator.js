const Calculator = (() => {
    let total = 0;

    function add(num1, num2) {
        return num1 + num2;
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        if (num2 !== 0)
            return num1 / num2;
        throw IllegalArgumentException(`Can't divide by zero`);
    }
    
    function getBalance() {
        return total;
    }

    function deposit(amount) {
            total += amount;
    }

    function withdraw(amount) {
            total -= amount;
    }

    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        getBalance: getBalance,
        deposit: deposit,
        withdraw: withdraw
    }
})();