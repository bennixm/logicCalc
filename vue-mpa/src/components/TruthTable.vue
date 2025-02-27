<template>
 <div class="section page calculators">
  <div class="overlay shadow-overlay">
      <div class="container">
      <div class="title-container multiple-titles">
        <span class="title xl-title">Truth table</span>
        <span class="mini-title">You can now generate a truth table!</span>
      </div>
      </div>
    </div>
  </div>
  <div class="section logical-calculator-section">
    <div class="container">
      <div class="truth-table-menu">
        <div v-for="(variable, index) in variables" :key="index" class="truth-table-menu-itm">
            <select v-if="index > 0" v-model="variable.operator">
            <option value="&&">AND</option>
            <option value="||">OR</option>
            <option value="^">XOR</option>
            <option value="!">XNOR</option>
            <option value=">">IF-THEN</option>
            <option value="<>" >BICONDITIONAL</option>
          </select>
          <input 
            v-model="variable.name" 
            :placeholder="'Enter variable ' + String.fromCharCode(65 + index)" 
          />
        </div>

        <button @click="addVariable" :disabled="variables.length >= 5" class="button-tt">Add Variable</button>

        <div class="button-calc-wrapper">
                <button @click="generateTruthtable" class="border-animation-button">
                    <span class="button-text">Generate Truth table</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
      </div>
  
      <table v-if="truthtable.length">
        <thead>
          <tr>
            <th v-for="(variable, index) in variables" :key="index">{{ variable.name }}</th>
            <th>{{ expression }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in truthtable" :key="index">
            <td v-for="(value, vIndex) in row.slice(0, variables.length)" :key="vIndex" :class="getClass(value)">
              {{ value }}
            </td>
            <td :class="getClass(row[variables.length])">{{ row[variables.length] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        variables: [{ name: 'A', operator: '' }, { name: 'B', operator: '&&' }],
        truthtable: [],
        expression: '', // To store the full expression for the header
      };
    },
    methods: {
      addVariable() {
        if (this.variables.length < 5) {
          const newVariableName = String.fromCharCode(65 + this.variables.length); // A, B, C, etc.
          this.variables.push({ name: newVariableName, operator: '&&' });
  
          // After adding the new variable, regenerate the truth table
          this.generateTruthtable();
        }
      },
      generateTruthtable() {
        // Validate inputs
        if (this.variables.length < 2) {
          Swal.fire('Input Error', 'Please enter at least two variables and select an operation.', 'error');
          return;
        }
  
        // Generate the full expression
        this.expression = this.variables.map((variable, index) => {
          if (index > 0) {
            return `${variable.operator} ${variable.name}`;
          }
          return variable.name;
        }).join(' ');
  
        // Generate all combinations of the truth values for the variables
        const combinations = this.generateCombinations(this.variables.length);
  
        const results = combinations.map((combination) => {
          let result = combination[0]; // Start with the first variable's value
  
          for (let i = 1; i < this.variables.length; i++) {
            const currentOperator = this.variables[i].operator;
            const currentVariable = combination[i];
  
            switch (currentOperator) {
              case '&&':
                result = result && currentVariable;
                break;
              case '||':
                result = result || currentVariable;
                break;
              case '^':
                result = result !== currentVariable;
                break;
              case '!':
                result = !(result && currentVariable);
                break;
              case '>':
                result = !result || currentVariable;
                break;
              case '<>':
                result = result === currentVariable;
                break;
              default:
                result = 'Error';
                break;
            }
          }
  
          return [...combination, result];
        });
  
        this.truthtable = results;
      },
      generateCombinations(numVars) {
        const combinations = [];
        const numRows = Math.pow(2, numVars);
  
        for (let i = 0; i < numRows; i++) {
          combinations.push(
            Array.from({ length: numVars }, (_, j) => !!(i & (1 << (numVars - j - 1))))
          );
        }
  
        return combinations;
      },
      getClass(value) {
        return value === true ? 'true-cell' : value === false ? 'false-cell' : '';
      }
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  
  th, td {
    padding: 8px;
    text-align: center;
  }
  
  </style>
  