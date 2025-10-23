// Calculator class using Java-style OOP principles
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = '';
        this.history = [];
    }

    appendNumber(num) {
        if (this.currentValue === '0' && num !== '.') {
            this.currentValue = num;
        } else if (num === '.' && this.currentValue.includes('.')) {
            return;
        } else {
            this.currentValue += num;
        }
        this.updateDisplay();
    }

    appendOperator(op) {
        if (this.currentValue === '') return;
        
        if (this.previousValue !== '') {
            this.calculate();
        }
        
        this.operator = op;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        const calculation = `${prev} ${this.operator} ${current} = ${result}`;
        this.addToHistory(calculation);
        
        this.currentValue = result.toString();
        this.operator = '';
        this.previousValue = '';
        this.updateDisplay();
    }

    calculateSquareRoot() {
        const num = parseFloat(this.currentValue);
        if (num < 0) {
            this.currentValue = 'Error';
        } else {
            const result = Math.sqrt(num);
            this.addToHistory(`√${num} = ${result}`);
            this.currentValue = result.toString();
        }
        this.updateDisplay();
    }

    calculateSquare() {
        const num = parseFloat(this.currentValue);
        const result = num * num;
        this.addToHistory(`${num}² = ${result}`);
        this.currentValue = result.toString();
        this.updateDisplay();
    }

    calculatePower() {
        this.appendOperator('**');
    }

    calculateSin() {
        const num = parseFloat(this.currentValue);
        const result = Math.sin(num * Math.PI / 180);
        this.addToHistory(`sin(${num}°) = ${result.toFixed(6)}`);
        this.currentValue = result.toFixed(6);
        this.updateDisplay();
    }

    calculateCos() {
        const num = parseFloat(this.currentValue);
        const result = Math.cos(num * Math.PI / 180);
        this.addToHistory(`cos(${num}°) = ${result.toFixed(6)}`);
        this.currentValue = result.toFixed(6);
        this.updateDisplay();
    }

    calculateTan() {
        const num = parseFloat(this.currentValue);
        const result = Math.tan(num * Math.PI / 180);
        this.addToHistory(`tan(${num}°) = ${result.toFixed(6)}`);
        this.currentValue = result.toFixed(6);
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = '';
        this.updateDisplay();
    }

    deleteLast() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('display').textContent = this.currentValue;
    }

    addToHistory(calculation) {
        this.history.unshift(calculation);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.updateHistory();
    }

    updateHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        
        this.history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = item;
            historyList.appendChild(div);
        });
    }
}

// Initialize calculator
const calc = new Calculator();

// Global functions for HTML onclick events
function appendNumber(num) {
    calc.appendNumber(num);
}

function appendOperator(op) {
    calc.appendOperator(op);
}

function calculate() {
    calc.calculate();
}

function clearDisplay() {
    calc.clear();
}

function deleteLast() {
    calc.deleteLast();
}

function calculateSquareRoot() {
    calc.calculateSquareRoot();
}

function calculateSquare() {
    calc.calculateSquare();
}

function calculatePower() {
    calc.calculatePower();
}

function calculateSin() {
    calc.calculateSin();
}

function calculateCos() {
    calc.calculateCos();
}

function calculateTan() {
    calc.calculateTan();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});
