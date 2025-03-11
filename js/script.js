let navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

function checkearPosicionScroll() {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > 56) {
    navbar.classList.add("sticky-top");
  } else {
    navbar.classList.remove("sticky-top");
  }

  lastScrollTop = scrollTop;
}

$(document).ready(function () {


  checkearPosicionScroll();
  window.addEventListener("scroll", checkearPosicionScroll);
});
