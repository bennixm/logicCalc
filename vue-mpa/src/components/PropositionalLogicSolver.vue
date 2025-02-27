<template>
    <div class="section page calculators">
      <div class="overlay shadow-overlay">
        <div class="container">
          <div class="title-container multiple-titles">
            <span class="title xl-title">Predicate Logic Evaluator</span>
            <span class="mini-title">Evaluate statements with quantifiers</span>
          </div>
        </div>
      </div>
    </div>
    <div class="section logical-calculator-section">
      <div class="container">
        <textarea v-model="inputStatement" placeholder="Enter a predicate logic statement (e.g., ∀x (P(x) → Q(x)))"></textarea>
        <button @click="evaluatePredicateLogic">Evaluate</button>
        <p v-if="result !== null">Result: <strong>{{ result }}</strong></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputStatement: "",
        result: null,
        domain: [true, false], // Example domain for x values
      };
    },
    methods: {
      evaluatePredicateLogic() {
        try {
          if (!this.inputStatement.trim()) {
            this.result = null;
            return;
          }
          
          const isValid = this.processQuantifiers(this.inputStatement);
          this.result = isValid ? "Valid" : "Invalid";
        } catch (error) {
          console.error("Error evaluating predicate logic:", error);
          this.result = "Error in evaluation";
        }
      },
      processQuantifiers(expression) {
        let universalMatch = expression.match(/∀([a-z])\s*\((.+)\)/);
        let existentialMatch = expression.match(/∃([a-z])\s*\((.+)\)/);
        
        if (universalMatch) {
          const variable = universalMatch[1];
          const predicate = universalMatch[2];
          return this.domain.every(value => this.evaluateExpression(predicate.replace(new RegExp(variable, 'g'), value)));
        }
        
        if (existentialMatch) {
          const variable = existentialMatch[1];
          const predicate = existentialMatch[2];
          return this.domain.some(value => this.evaluateExpression(predicate.replace(new RegExp(variable, 'g'), value)));
        }
        
        return this.evaluateExpression(expression);
      },
      evaluateExpression(expression) {
        let expr = expression;
        expr = expr.replace(/¬([A-Za-z(]+)/g, (_, v) => `!(${v})`);
        expr = expr.replace(/([A-Za-z(]+) → ([A-Za-z(]+)/g, (_, a, b) => `(!(${a}) || (${b}))`);
        expr = expr.replace(/([A-Za-z(]+) ∧ ([A-Za-z(]+)/g, (_, a, b) => `(${a} && ${b})`);
        expr = expr.replace(/([A-Za-z(]+) ∨ ([A-Za-z(]+)/g, (_, a, b) => `(${a} || ${b})`);
        expr = expr.replace(/\(([^()]+)\)/g, (_, subExpr) => this.evaluateExpression(subExpr));
        
        try {
          return Boolean(eval(expr.replace(/true/g, '1').replace(/false/g, '0')));
        } catch (error) {
          return false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  p {
    font-size: 1.2em;
  }
  </style>