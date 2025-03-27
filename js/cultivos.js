let frutas = [];

const swiper_wrapper = document.querySelector('.swiper-wrapper');
const swiper_fruta_name = document.querySelector('.swiper-fruta-name');
const presentacion_fruta = document.querySelector('.presentacion-fruta');

const urlParams = new URLSearchParams(window.location.search);
const getParams = Object.fromEntries(urlParams.entries());
console.log('GET parameters:', getParams);

fetch('frutas.json').then(response => response.json()).then(data => {
    frutas = data.frutas;
    data.frutas.forEach(fruta => {

        //Carga las frutas al slider
        const swiper_slide = document.createElement('div');
        swiper_slide.classList.add('swiper-slide');
        swiper_slide.innerHTML += `
                <div class="swiper-slide d-flex flex-column">
                    <img src="images/${fruta.imagen}" alt="${fruta.nombre}">
                   <div class="nombre-fruta">${fruta.nombre}</div>
                </div
            `;
        swiper_wrapper.appendChild(swiper_slide);

    });
    cargarSwiper();
}).catch(error => console.error('Error loading frutas.json:', error));

function cargarSwiper() {

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        centeredSlides: true, // Centra automáticamente el slide activo
        slidesPerView: 'auto', // Ajusta el tamaño de los slides dinámicamente
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            init: function () {
                const fruta = getParams.fruta;
                console.log('Init swiper with fruta:', fruta);
                if (fruta) {
                    const frutaIndex = frutas.findIndex(f => f.nombre == fruta);
                    console.log('Fruta index:', frutaIndex);
                    if (frutaIndex !== -1) {
                        this.slideTo(frutaIndex);
                        swiper_fruta_name.textContent = frutas[frutaIndex].nombre;
                        cargarDatosFruta(frutas[frutaIndex]);
                    }
                } else {
                    swiper_fruta_name.textContent = frutas[0].nombre;
                    location.href = 'cultivos.html?fruta=' + frutas[0].nombre;
                }

            },
            slideChange: function () {
                const nombreFruta = getParams.fruta;
                const fruta = frutas[this.activeIndex];

                console.log('Slide changed to', fruta.nombre);
                swiper_fruta_name.textContent = fruta.nombre;
                history.replaceState(null, '', 'cultivos.html?fruta=' + frutas[this.activeIndex].nombre);
                cargarDatosFruta(fruta);
            }
        }
    });

}

function cargarDatosFruta(fruta) {
    //console.log('Cargando datos de fruta:', fruta);
    //Carga la presentación de la fruta
    presentacion_fruta.innerHTML = "";
    const presentacionFresco = fruta.presentaciones.find(p => p.tipo === "fresco");
    if (presentacionFresco) {
        presentacion_fruta.innerHTML += `
         <div class="fruta-fresca d-flex align-items-center justify-content-center">
             <img src="images/iconos/fresco.svg" alt=""> Fresco
         </div>
         `;
         document.querySelector(".card-area-cultivo")
    }

    const presentacionCongelado = fruta.presentaciones.find(p => p.tipo === "congelado");
    if (presentacionCongelado) {
        presentacion_fruta.innerHTML += `
         <div class="fruta-congelada d-flex align-items-center justify-content-center">
             <img src="images/iconos/congelado.svg" alt=""> Congelado
         </div>
         `;
    }
}
