<template>
<div class="section page calculators">
 <div class="overlay shadow-overlay">
     <div class="container">
     <div class="title-container multiple-titles">
       <span class="title xl-title">Loan EMI Calculator</span>
       <span class="mini-title">Calculate your salary</span>
     </div>
     </div>
   </div>
 </div>
 <div class="mini-calculator">
    <div class="container">
      <i class="fa fa-money" aria-hidden="true"></i>
      <label for="loanAmount">Loan Amount ($): </label>
      <input type="number" v-model="loanAmount" id="loanAmount" />
      
      <label for="interestRate">Interest Rate (%): </label>
      <input type="number" v-model="interestRate" id="interestRate" />
      
      <label for="loanTerm">Loan Term (years): </label>
      <input type="number" v-model="loanTerm" id="loanTerm" />
      

      <div class="button-calc-wrapper">
                <button type="submit" @click="calculateEMI" class="border-animation-button">
                    <span class="button-text">Calculate EMI</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
      
      <div v-if="emi !== null">
        <p>Monthly EMI: ${{ emi }}</p>
        <p>Total Payment: ${{ totalPayment }}</p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loanAmount: null,
        interestRate: null,
        loanTerm: null,
        emi: null,
        totalPayment: null
      };
    },
    methods: {
      calculateEMI() {
        const principal = this.loanAmount;
        const rate = this.interestRate / 100 / 12;
        const months = this.loanTerm * 12;
  
        if (principal && rate && months) {
          const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
          this.emi = emi.toFixed(2);
          this.totalPayment = (emi * months).toFixed(2);
        }
      }
    }
  };
  </script>
  
  