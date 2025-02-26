<template>
    <div>
      <h2>Truth Table Generator</h2>
      <div>
        <div v-for="(variable, index) in variables" :key="index">
          <input 
            v-model="variable.name" 
            :placeholder="'Enter variable ' + String.fromCharCode(65 + index)" 
          />
          <select v-if="index > 0" v-model="variable.operator">
            <option value="&&">AND</option>
            <option value="||">OR</option>
            <option value="^">XOR</option>
            <option value="!">XNOR</option>
            <option value=">">IF-THEN</option>
            <option value="<>" >BICONDITIONAL</option>
          </select>
        </div>
        <button @click="addVariable" :disabled="variables.length >= 5">Add Variable</button>
        <button @click="generateTruthTable">Generate Truth Table</button>
      </div>
  
      <table v-if="truthTable.length">
        <thead>
          <tr>
            <th v-for="(variable, index) in variables" :key="index">{{ variable.name }}</th>
            <th>{{ expression }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in truthTable" :key="index">
            <td v-for="(value, vIndex) in row.slice(0, variables.length)" :key="vIndex">{{ value }}</td>
            <td>{{ row[variables.length] }}</td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="truthTable.length">Number of Variables: {{ variables.length }}</p>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        variables: [{ name: 'A', operator: '' }, { name: 'B', operator: '&&' }],
        truthTable: [],
        expression: '', // To store the full expression for the header
      };
    },
    methods: {
      addVariable() {
        if (this.variables.length < 5) {
          const newVariableName = String.fromCharCode(65 + this.variables.length); // A, B, C, etc.
          this.variables.push({ name: newVariableName, operator: '&&' });
        }
      },
      generateTruthTable() {
        if (this.variables.length < 2) {
          Swal.fire('Input Error', 'Please enter at least two variables and select an operation.', 'error');
          return;
        }
  
        this.expression = this.variables.map((variable, index) => {
          if (index > 0) {
            return `${variable.operator} ${variable.name}`;
          }
          return variable.name;
        }).join(' ');
  
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
  
        this.truthTable = results;
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
      }
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid black;
  }
  
  th, td {
    padding: 8px;
    text-align: center;
  }
  </style>
  