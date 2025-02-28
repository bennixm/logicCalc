<template>
 <div class="section page calculators">
 <div class="overlay shadow-overlay">
     <div class="container">
     <div class="title-container multiple-titles">
       <span class="title xl-title">BMI Calculator</span>
       <span class="mini-title">Calculate your BMI</span>
     </div>
     </div>
   </div>
 </div>
 <div class="mini-calculator">
    <div class="container">
      <label for="weight">Weight (kg): </label>
      <input type="number" v-model="weight" id="weight" />
      
      <label for="height">Height (cm): </label>
      <input type="number" v-model="height" id="height" />
      

      <div class="button-calc-wrapper">
                <button type="submit" @click="calculateBMI" class="border-animation-button">
                    <span class="button-text">Calculate BMI</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
      
      <div v-if="bmi !== null">
        <p>Your BMI: {{ bmi }}</p>
        <p>{{ bmiCategory }}</p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weight: null,
        height: null,
        bmi: null,
      };
    },
    computed: {
      bmiCategory() {
        if (this.bmi < 18.5) return "Underweight";
        else if (this.bmi < 24.9) return "Normal weight";
        else if (this.bmi < 29.9) return "Overweight";
        else return "Obesity";
      }
    },
    methods: {
      calculateBMI() {
        if (this.weight && this.height) {
          const heightInMeters = this.height / 100;
          this.bmi = this.weight / (heightInMeters * heightInMeters);
        }
      }
    }
  };
  </script>
  