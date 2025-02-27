<template>
<div class="section page mathematical-calculators">
  <div class="overlay shadow-overlay">
      <div class="container">
      <div class="title-container multiple-titles">
        <span class="title xl-title">Mathematical Calculators</span>
        <span class="mini-title">We make the things easier for you</span>
      </div>
      </div>
    </div>
  </div>
  <section class="content-calculator special-services">
          <div class="container">
          <div class="subcontent-calculator services-panel">
          <div class="decoration-item"></div>
          <div class="image-item image1-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-calculator" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">Simple Operations</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">Calculator</span>
          <span class="section-text">A calculator is a device that helps perform basic arithmetic operations like addition, subtraction, multiplication, and division. When you input numbers and press the corresponding operation buttons, the calculator uses its internal logic to process the input and provide a result.</span>
          <div class="button-calc-wrapper">
                <button @click="goToCalculator" class="border-animation-button">
                    <span class="button-text">Try it now</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
        </div>
          </div>
</section>
  </template>
  
  <script>
  export default {
    name: "MathematicalOperations",
    methods: {
      goToCalculator() {
        this.$router.push('/calculator'); 
      }
    }
  };
  </script>
  