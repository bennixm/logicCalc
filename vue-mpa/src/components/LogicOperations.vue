<template>
<div class="section page logical-calculators">
  <div class="overlay shadow-overlay">
      <div class="container">
      <div class="title-container multiple-titles">
        <span class="title xl-title">Logical Calculators</span>
        <span class="mini-title">Use one of our Logical Calculator</span>
      </div>
      </div>
    </div>
  </div>
  <section class="content-calculator special-services">
          <div class="container">
          <div class="subcontent-calculator services-panel">
          <div class="decoration-item"></div>
          <div class="image-item image2-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-table" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">Table</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">Truth Table</span>
          <span class="section-text">A truth table is a mathematical table used to show the possible outcomes of logical expressions based on the truth values of their components. It helps in understanding how different logical operations work in combinations of true and false values.</span>
          <div class="button-calc-wrapper">
                <button @click="goToTruthTable" class="border-animation-button">
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
          <div class="image-item image3-item special-image-item"></div>
          <div class="title-item-services">
            <i class="fa fa-link" aria-hidden="true"></i>
          <span class="title-item-servicee-titlex2">Simple Operations</span>
          </div>
          </div>
          <div class="subcontent-calculator services-panel-text">
          <span class="mini-title-section">Logic Circuits</span>
          <span class="section-text">A Logic Circuits Calculator is a tool designed to help users simulate and evaluate the behavior of digital logic circuits. Logic circuits use basic logical operations like AND, OR, NOT, NAND, NOR, XOR, and XNOR to perform tasks based on binary inputs (0 or 1). This calculator simplifies the process by providing an easy way to input logic gate configurations and observe the resulting output.</span>
          <div class="button-calc-wrapper">
                <button @click="goToCircuits" class="border-animation-button">
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
    name: "LogicalOperations",
    methods: {
      goToCircuits() {
        this.$router.push('/circuit-builder'); 
      },
      goToTruthTable() {
        this.$router.push('/truth-table'); 
      }
    }
  };
  </script>
  