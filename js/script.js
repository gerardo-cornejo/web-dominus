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
  let card = $(".seccion-certificaciones div .cards .card").first();
  let cloned = card.clone();
  $(".seccion-certificaciones div .cards").append(cloned);
  card.remove();
});


$(document).on("click", ".btn-prev", () => {
  //mover el ultimo elmento de .certificaciones .row .card al principio de forma suave
  let card = $(".seccion-certificaciones div .cards .card").last();
  let cloned = card.clone();
  $(".seccion-certificaciones div .cards").prepend(cloned);
  card.remove();
});

function actualizarAnio() {
  let anio = new Date().getFullYear();
  $("#footer-year").text(anio);
}

$(document).ready(function () {
  checkearPosicionScroll();
  window.addEventListener("scroll", checkearPosicionScroll);
  actualizarAnio();
});
