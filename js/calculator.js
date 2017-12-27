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
        throw `Can't divide by zero`;
    }
    
    function getBalance() {
        return total;
    }

    function deposit(amount) {
        if (amount < 0)
            throw `Can't deposit a negative amount`
        else     
            total += amount;
    }

    function withdraw(amount) {
        if (amount < 0)
            throw `Can't withdraw a negative amount`;
        else if (amount > total)
            throw `Amount is greater than current balance. Current balance: $${total.toFixed(2)}`;
        else 
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