
function handleScroll() {
  const navbar = document.querySelector('.navbar-element');
  

  if (window.scrollY === 0) {
    navbar.classList.add('scrolled-top'); 
  } else {
    navbar.classList.remove('scrolled-top');
  }
}

window.addEventListener('scroll', handleScroll);
