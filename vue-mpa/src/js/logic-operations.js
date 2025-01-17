class LogicalCalculator {
    constructor() {
        this.expressionInput = document.getElementById("expression");
        this.resultOutput = document.getElementById("result");
        this.errorMessageOutput = document.getElementById("error-message");
        this.evaluateButton = document.getElementById("evaluate-btn");
        this.clearButton = document.getElementById("clear-btn");

        
        this.bindEvents();
    }

    
    bindEvents() {
        this.evaluateButton.addEventListener("click", () => this.evaluateExpression());
        this.clearButton.addEventListener("click", () => this.clearExpression());
        this.expressionInput.addEventListener("input", () => this.validateExpression());
    }

    
    validateExpression() {
        const expr = this.expressionInput.value;
        const validPattern = /^[01A-Za-zANDORNOTXOR\s()]*$/;

        if (!validPattern.test(expr)) {
            this.errorMessageOutput.textContent = "Invalid characters in expression! Only '0', '1', variables (A-Z), AND, OR, NOT, XOR, and parentheses are allowed.";
        } else {
            this.errorMessageOutput.textContent = "";
        }
    }

    
    evaluateExpression() {
        const expr = this.expressionInput.value;

        
        if (!this.isValidExpression(expr)) {
            this.resultOutput.textContent = "Invalid expression!";
            return;
        }

        try {
           
            let transformedExpr = expr
                .replace(/AND/g, '&&')  
                .replace(/OR/g, '||')    
                .replace(/NOT/g, '!')    
                .replace(/XOR/g, '^');   

            
            let result = eval(transformedExpr);

            
            this.resultOutput.textContent = result;
        } catch (error) {
            this.resultOutput.textContent = "Error in expression!";
        }
    }

    
    isValidExpression(expression) {
        const validPattern = /^[01A-Za-zANDORNOTXOR\s()]*$/;
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
