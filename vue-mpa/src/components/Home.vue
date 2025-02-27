<template>
  <div class="section landing-section">
    <div class="overlay black-overlay">
      <div class="container">
      <div class="title-container center-title multiple-titles">
        <span class="mini-title">Mathematical & Logical Calculator</span>
        <span class="title xl-title">Our Solution, Every Calculation.</span>
      </div>
      </div>
      <div class="tablet">
        <div class="tablet-content">

        </div>
      </div>
    </div>
  </div>
<div class="section three-elements">
  <div class="container">
    <div class="title-container center-title"><span class="title">You should try this..</span></div>
    <div class="line">
      <router-link to="/calculator" class="element">
        <img src="../images/calc.jpg">
        <span class="element-title">Calculator</span>
      </router-link>
      <router-link to="/truth-table" class="element">
        <img src="../images/table.jpg">
        <span class="element-title">Truth Table</span>
      </router-link>
      <router-link to="/circuit-builder" class="element">
        <img src="../images/circuits.jpg">
        <span class="element-title">Circuit Builder</span>
      </router-link>
    </div>
  </div>  
</div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
