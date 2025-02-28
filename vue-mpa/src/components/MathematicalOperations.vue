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
<section class="content-calculator reverse special-services">
          <div class="container">
          <div class="subcontent-calculator services-panel">
          <div class="decoration-item"></div>
          <div class="image-item image4-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-birthday-cake" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">Find your age</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">Age Calculator</span>
          <span class="section-text">Calculate your exact age in years, months, and days by entering your birthdate for an accurate result.</span>
          <span class="section-text">Find out your precise age with this tool by simply entering your birthdate, showing years, months, and days.</span>
          <div class="button-calc-wrapper">
                <button @click="goToAge" class="border-animation-button">
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
<section class="content-calculator special-services">
          <div class="container">
          <div class="subcontent-calculator services-panel">
          <div class="decoration-item"></div>
          <div class="image-item image5-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-cutlery" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">BMI</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">BMI Calculator</span>
          <span class="section-text">Quickly calculate your BMI and see if you're underweight, healthy, overweight, or obese based on your weight and height.</span>
          <span class="section-text">Enter your weight and height to calculate your BMI instantly, helping you track your health status and wellness journey.</span>
          <div class="button-calc-wrapper">
                <button @click="goToBmi" class="border-animation-button">
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
<section class="content-calculator reverse special-services">
          <div class="container">
          <div class="subcontent-calculator services-panel">
          <div class="decoration-item"></div>
          <div class="image-item image6-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-money" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">Salary</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">Loan EMI Calculator</span>
          <span class="section-text">Estimate your monthly loan payments by entering the loan amount, interest rate, and term for an easy EMI calculation.</span>
          <span class="section-text">Use this loan EMI calculator to determine your monthly payments and total loan cost based on loan terms.</span>
          <div class="button-calc-wrapper">
                <button @click="goToEmi" class="border-animation-button">
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
      },
      goToAge() {
        this.$router.push('/age-calculator'); 
      },
      goToBmi() {
        this.$router.push('/bmi-calculator'); 
      },
      goToEmi() {
        this.$router.push('/emi-calculator'); 
      }
    }
  };
  </script>
  