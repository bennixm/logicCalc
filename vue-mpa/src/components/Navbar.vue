<template>
  <header class="navbar-element scrolled-top">
     <nav class="navbar">
      <div class="logo">
        <div class="logo-container">
          <div class="logo-img"></div>
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
<div :class="{ 'menu-open': menuOpen }" class="header">
    <div class="icon-container" @click="toggleMenu">
      <div id="menuicon">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
      </div>
    </div>
    <div class="mobile-menu">
      <ul class="menu">
             <li class="menu-item"><router-link to="/">Home</router-link></li>
            <li class="menu-item"><router-link to="/about">About us</router-link></li>
            <li class="menu-item"><router-link to="/calculators">Calculators</router-link></li>
            <li class="menu-item"><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { changeNavbar } from '../js/navbar-scrolled.js';
export default {
data() {
  return {
    menuOpen: false, 
  };
},
methods: {
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  },
},
watch: {
  $route(to, from) {
    // Close the menu when route changes
    this.menuOpen = false;
  }
},
};
</script>

