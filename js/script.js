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

$(document).on("click", ".btn-next", () => {
  //mover el primer elmento de .certificaciones .row .card al final de forma suave
  let card = $(".certificaciones .row .card").first();
  $(".certificaciones .row").append(card);

});

$(document).on("click", ".btn-prev", () => {
  //mover el ultimo elmento de .certificaciones .row .card al principio de forma suave
  let card = $(".certificaciones .row .card").last();
  $(".certificaciones .row").prepend(card);
});

$(document).ready(function () {
  checkearPosicionScroll();
  window.addEventListener("scroll", checkearPosicionScroll);
});
