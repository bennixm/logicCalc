<template>
    <header>
      <div class="container">
       <nav class="navbar">
          <ul>
              <li><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link></li>
              <li><router-link to="/about"><i class="fa fa-users" aria-hidden="true"></i> About</router-link></li>
              <li><router-link to="/calculators"><i class="fa fa-calculator" aria-hidden="true"></i> Calculators</router-link></li>
              <li><router-link to="/contact"><i class="fa fa-phone" aria-hidden="true"></i> Contact</router-link></li>
          </ul>
       </nav>
       <div class="mini-search">
          <div class="mini-search-container">
            <input type="text" id="box" placeholder="Search a calculator..." class="search__box">
            <i class="fa fa-search search__icon" id="icon" onclick="toggleShowSearch()"></i>
          </div>
       </div>
      </div>
  </header>
</template>

<script>

export default {
  name: "NavbarModule",
};
</script>

<style>

</style>
