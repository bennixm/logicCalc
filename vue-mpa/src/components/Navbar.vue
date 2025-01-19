<template>
    <header class="navbar-element scrolled-top">
       <nav class="navbar">
        <div class="logo">
          <div class="logo-container">
            
          </div>
        </div>
        <div class="links">
          <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About us</router-link></li>
              <li><router-link to="/calculators">Calculators</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
          <div class="mini-search">
          <div class="mini-search-container">
            <input type="text" id="box" placeholder="Search" class="search__box">
            <i class="fa fa-search search__icon" id="icon" onclick="toggleShowSearch()"></i>
          </div>
       </div>
       </nav>
  </header>
</template>



<script>

import { changeNavbar } from '../js/navbar-scrolled.js';

export default {
  name: "NavbarModule",
};
</script>

<style>

</style>
