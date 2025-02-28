<template>
<div class="section page calculators">
 <div class="overlay shadow-overlay">
     <div class="container">
     <div class="title-container multiple-titles">
       <span class="title xl-title">Age Calculator</span>
       <span class="mini-title">How old are you?</span>
     </div>
     </div>
   </div>
 </div>
 <div class="mini-calculator">
    <div class="container">
      <i class="fa fa-birthday-cake" aria-hidden="true"></i>
      <label for="birthDate">Enter Your Birthdate: </label>
      <input type="date" v-model="birthDate" id="birthDate" />
      <div class="button-calc-wrapper">
                <button type="submit" @click="calculateAge" class="border-animation-button">
                    <span class="button-text">Calculate</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
      <div v-if="age">
        <p>Your Age: {{ age.years }} years, {{ age.months }} months, and {{ age.days }} days</p>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        birthDate: '',
        age: null
      };
    },
    methods: {
      calculateAge() {
        if (this.birthDate) {
          const birth = new Date(this.birthDate);
          const today = new Date();
          let years = today.getFullYear() - birth.getFullYear();
          let months = today.getMonth() - birth.getMonth();
          let days = today.getDate() - birth.getDate();
  
          if (months < 0) {
            months += 12;
            years--;
          }
          if (days < 0) {
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            months--;
          }
  
          this.age = { years, months, days };
        }
      }
    }
  };
  </script>
  
  