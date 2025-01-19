class LogicalCalculator {
    constructor() {
        this.expressionInput = document.getElementById("expression");
        this.resultOutput = document.getElementById("result");
        this.errorMessageOutput = document.getElementById("error-message");
        this.evaluateButton = document.getElementById("evaluate-btn");
        this.clearButton = document.getElementById("clear-btn");

        this.variables = {};  // Store user-defined variables
        this.bindEvents();
    }

    bindEvents() {
        this.evaluateButton.addEventListener("click", () => this.evaluateExpression());
        this.clearButton.addEventListener("click", () => this.clearExpression());
        this.expressionInput.addEventListener("input", () => this.validateExpression());
    }

    // Real-time validation for input feedback (UI)
    validateExpression() {
        const expr = this.expressionInput.value;

        // Use isValidExpression to check if the expression is valid
        if (!this.isValidExpression(expr)) {
            this.errorMessageOutput.textContent = "Invalid characters in expression! Only '0', '1', variables (A-Z), AND, OR, NOT, XOR, IMPLIES, BICONDITIONAL, NAND, NOR, and parentheses are allowed.";
        } else {
            this.errorMessageOutput.textContent = "";
        }
    }

    // Main method to evaluate the logical expression
    evaluateExpression() {
        const expr = this.expressionInput.value;

        // Validate the expression before proceeding with computation
        if (!this.isValidExpression(expr)) {
            this.resultOutput.textContent = "Invalid expression!";
            return;
        }

        try {
            let transformedExpr = this.transformExpression(expr);
            let result = this.computeOperations(transformedExpr);
            this.resultOutput.textContent = result;
        } catch (error) {
            this.resultOutput.textContent = "Error in expression!";
        }
    }

    // Replace logical operators with JavaScript equivalents
    transformExpression(expression) {
        return expression
            .replace(/\bAND\b/g, '&&')   // AND -> &&
            .replace(/\bOR\b/g, '||')    // OR -> ||
            .replace(/\bNOT\b/g, '!')    // NOT -> !
            .replace(/\bXOR\b/g, '^')    // XOR -> ^
            .replace(/\bIMPLIES\b/g, '=>') // IMPLIES -> =>
            .replace(/\bBICONDITIONAL\b/g, '<=>') // BICONDITIONAL -> <=>
            .replace(/\bNAND\b/g, '!&&') // NAND -> NOT(AND)
            .replace(/\bNOR\b/g, '!||')  // NOR -> NOT(OR)
            .replace(/\b([A-Za-z])\b/g, (match, p1) => this.getVariableValue(p1));  // Replace variables with their values
    }

    getVariableValue(variable) {
        // Use a default value for variables if not defined by the user
        return this.variables[variable] !== undefined ? this.variables[variable] : 0;  // Default to 0 if undefined
    }

    // Method to compute logical operations (manual evaluation)
    computeOperations(expression) {
        const tokens = this.tokenizeExpression(expression);

        const precedence = {
            '(': 0,
            ')': 0,
            '!': 3,  // NOT has highest precedence
            '^': 2,  // XOR
            '&&': 1, // AND
            '||': 0, // OR
            '=>': 1, // IMPLIES
            '<=>': 1, // BICONDITIONAL
            '!&&': 2, // NAND (NOT AND)
            '!||': 2, // NOR (NOT OR)
        };

        const values = [];
        const operators = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (this.isBooleanValue(token)) {
                values.push(Number(token));
            } else if (this.isOperator(token)) {
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    const op = operators.pop();
                    const value2 = values.pop();
                    const value1 = values.pop();
                    values.push(this.applyOperator(op, value1, value2));
                }
                operators.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators[operators.length - 1] !== '(') {
                    const op = operators.pop();
                    const value2 = values.pop();
                    const value1 = values.pop();
                    values.push(this.applyOperator(op, value1, value2));
                }
                operators.pop();
            }
        }

        while (operators.length) {
            const op = operators.pop();
            const value2 = values.pop();
            const value1 = values.pop();
            values.push(this.applyOperator(op, value1, value2));
        }

        return values.pop();
    }

    tokenizeExpression(expression) {
        return expression
            .replace(/\s+/g, '')   
            .split(/([()!&|^=><>]+)/g)  
            .filter(token => token.length > 0);
    }

    isBooleanValue(token) {
        return token === '0' || token === '1';
    }

    isOperator(token) {
        return ['&&', '||', '!', '^', '=>', '<=>', '!&&', '!||'].includes(token);
    }

    applyOperator(operator, value1, value2) {
        switch (operator) {
            case '&&': return value1 && value2;               
            case '||': return value1 || value2;               
            case '!': return !value2;                          
            case '^': return value1 !== value2;               
            case '=>': return !value1 || value2;              
            case '<=>': return value1 === value2;             
            case '!&&': return !(value1 && value2);            
            case '!||': return !(value1 || value2);            
            default: throw new Error('Unknown operator');
        }
    }

    // Only this method is used for validation now
    isValidExpression(expression) {
        const validPattern = /^[01A-Za-zANDORNOTXORIMPLIESBICONDITIONALNANDNOR\s()]*$/;
        return validPattern.test(expression);
    }

    clearExpression() {
        this.expressionInput.value = '';
        this.resultOutput.textContent = '--';
        this.errorMessageOutput.textContent = '';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const calculator = new LogicalCalculator();
});

