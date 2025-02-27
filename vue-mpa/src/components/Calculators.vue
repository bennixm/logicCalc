<template>
  <div class="section page calculators">
  <div class="overlay shadow-overlay">
      <div class="container">
      <div class="title-container multiple-titles">
        <span class="title xl-title">Calculators</span>
        <span class="mini-title">Mathematical & Logical Calculator</span>
      </div>
      </div>
    </div>
  </div>
  <div class="section search">
  <div class="overlay white-overlay">
    <div class="container">
        <div class="title-container center-title"><span class="title">Search a calculator</span></div>
        <div class="search-input">
            <input type="search" placeholder="Search for something..">
            <button><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>
    </div>
  </div>
</div>
<div class="section three-elements category-pick">
  <div class="container">
    <div class="title-container center-title"><span class="title">Choose a category</span></div>
    <div class="line">
      <router-link to="/mathematical-operations" class="element">
        <img src="../images/math.jpg">
        <span class="element-title">Mathematical Operations</span>
      </router-link>
      <router-link to="/logical-operations" class="element">
        <img src="../images/logic.jpg">
        <span class="element-title">Logical Operations</span>
      </router-link>
    </div>
  </div>  
</div>
</template>

<script>
export default {
  name: "CalculatorsPage",
};
</script>
