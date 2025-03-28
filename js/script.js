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

//evento que detecte todos los botones. Si tienen el atributo href, redirigir a esa url
$(document).on("click", "*", function () {
  let href = $(this).attr("href");
  if (href) {
    window.location.href = href;
  }
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



const fontFolderPath = "/fonts";

function cargarFuentes() {
  fetch(fontFolderPath)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const fontFiles = Array.from(doc.querySelectorAll("a"))
        .map((link) => link.href)
        .filter((href) => href.match(/\.(woff2?|ttf|otf|eot)$/i));

      fontFiles.forEach((fontFile) => {
        const fontFace = new FontFace(fontFile.split("/").pop(), `url(${fontFile})`);
        fontFace.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
          // console.log("Font loaded:", loadedFont);
        });
      });
    })
    .catch((error) => console.error("Error loading fonts:", error));
}

cargarFuentes();
