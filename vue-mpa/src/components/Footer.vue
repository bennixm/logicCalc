<template>
<footer>
  <div class="footer">
   <div class="container">
    <div class="columns">
      <span class="title">Pages</span>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About us</router-link>
      <router-link to="/calculators">Calculators</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
    <div class="columns">
      <span class="title">Categories</span>
      <router-link to="/mathematical-operations">Mathematical Operations</router-link>
      <router-link to="/logical-operations">Logical Operations</router-link>
    </div>
    <div class="columns">
      <span class="title">Apps</span>
      <router-link to="/truth-table">Truth Table</router-link>
      <router-link to="/calculator">Calculator</router-link>
      <router-link to="/circuit-builder">Circuit Builder</router-link>
      <router-link to="/emi-calculator">Loan EMI Calculator</router-link>
      <router-link to="/age-calculator">Age Calculator</router-link>
      <router-link to="/bmi-calculator">Bmi Calculator</router-link>
      <router-link to="/emi-calculator">Emi Calculator</router-link>
    </div>
   </div>
  </div>
  <div class="footer-credits">
    <div class="container">
      <div class="logo">
        
      </div>
      <span>&copy; LogiCalc. All rights reserved.</span>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: "FooterModule",
};
</script>

<style>

</style>