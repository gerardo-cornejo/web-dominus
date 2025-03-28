let frutas = [];

var swiper;

const swiper_wrapper = document.querySelector('.swiper-wrapper');
const swiper_fruta_name = document.querySelector('.swiper-fruta-name');
const presentacion_fruta = document.querySelector('.presentacion-fruta');
const contenedor_presentaciones_fresco = document.querySelector('.contenedor-presentaciones-fresco');

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

    swiper = new Swiper(".mySwiper", {
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
                        cargarDatosFruta(frutas[frutaIndex], frutaIndex);
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
                cargarDatosFruta(fruta, this.activeIndex);
            }
        }
    });

}

function cargarDatosFruta(fruta, activeIndex) {
    //console.log('Cargando datos de fruta:', fruta);

    //Carga la presentación de la fruta
    presentacion_fruta.innerHTML = "";
    const presentacionFresco = fruta.presentaciones.find(p => p.tipo === "fresco");
    if (presentacionFresco) {
        //Carga el botón de presentación Fresco
        presentacion_fruta.innerHTML += `
         <div id="fruta-fresco" class="fruta-fresca d-flex align-items-center justify-content-center">
             <img src="images/iconos/fresco.svg" alt=""> Fresco
         </div>
         `;

        //Carga imagen del mapa de cultivo 
        const img_area_cultivo_fresco = document.querySelector(".area-presentacion-fresco .card .card-area-cultivo img");
        img_area_cultivo_fresco.src = `images/${presentacionFresco.area_cultivo}`;

        contenedor_presentaciones_fresco.innerHTML = "";

        //Cargar las presentaciones
        presentacionFresco.presentacion.forEach(pre => {
            contenedor_presentaciones_fresco.innerHTML += `<h6 class="presentacion-fresco">${pre.nombre}</h6>`;

            let ul = `<ul style="list-style: none; padding: 0;">`;

            pre.items.forEach(item => {
                ul += `<li>${item}</li>`;
            });

            ul += "</ul>";
            contenedor_presentaciones_fresco.innerHTML += ul;

        });

        //Carga imagen de la presentación de la fruta fresca
        document.querySelector(".presentacion-fresco img").src = "images/" + presentacionFresco.presentacion[0].imagen;
    }

    const presentacionCongelado = fruta.presentaciones.find(p => p.tipo === "congelado");
    if (presentacionCongelado) {
        presentacion_fruta.innerHTML += `
         <div id="fruta-congelado" class="fruta-congelada d-flex align-items-center justify-content-center">
             <img src="images/iconos/congelado.svg" alt=""> Congelado
         </div>
         `;
        const img_area_cultivo_congelado = document.querySelector(".area-presentacion-congelado .card .card-area-cultivo img");
        img_area_cultivo_congelado.src = `images/${presentacionCongelado.area_cultivo}`;

        const contenedor_presentaciones_congelado = document.querySelector('.contenedor-presentaciones-congelado');
        contenedor_presentaciones_congelado.innerHTML = "";

        presentacionCongelado.presentacion.forEach(pre => {
            contenedor_presentaciones_congelado.innerHTML += `<h6 class="presentacion-congelado">${pre.nombre}</h6>`;

            let ul = `<ul style="list-style: none; padding: 0;">`;

            pre.items.forEach(item => {
                ul += `<li>${item}</li>`;
            });

            ul += "</ul>";
            contenedor_presentaciones_congelado.innerHTML += ul;

        });

        document.querySelector(".presentacion-congelado img").src = "images/" + presentacionCongelado.presentacion[0].imagen;
    }

    actualizarEventoPresentacion(activeIndex);
}

function actualizarEventoPresentacion(frutaIndex) {
    const btnFresco = document.getElementById("fruta-fresco");
    if (btnFresco) {
        btnFresco.addEventListener("click", function () {
            document.querySelector(".area-presentacion-congelado").classList.add("d-none");
            document.querySelector(".area-presentacion-fresco").classList.remove("d-none");
            console.log("Fresca");
            btnFresco.classList.add("active");
            if (btnCongelado) {
                btnCongelado.classList.remove("active");
            }

            limpiarEstilosMeses();
            const calendario_fresco = frutas[frutaIndex].presentaciones.find(p => p.tipo === "fresco").calendario_produccion;
            const meses = document.querySelectorAll(".calendario-produccion .meses .mes");
            meses.forEach((mes, index) => {

                calendario_fresco.forEach(cal => {
                    if (mes.dataset.mes == cal.mes) {
                        mes.style.backgroundColor = cal.color;
                        mes.style.color = cal.textColor;
                    }
                });
            });
            //cargar destinos
            const destinos = frutas[frutaIndex].presentaciones.find(p => p.tipo === "fresco").destinos;
            console.log(destinos);
            const contenedor_destinos = document.querySelector(".destinos");
            contenedor_destinos.innerHTML = "";
            destinos.forEach(destino => {
                contenedor_destinos.innerHTML += `
                 <div class="destino position-absolute" style="background-color:${destino.color_fondo}; top: ${destino.ubicacion_mapa.top}; left: ${destino.ubicacion_mapa.left};">
                 <img src="${destino.imagen ? destino.imagen : ""}" alt=""> ${destino.nombre}
                 </div>
             `;

            });



        });

    }

    const btnCongelado = document.getElementById("fruta-congelado");
    if (btnCongelado) {
        btnCongelado.addEventListener("click", function () {
            document.querySelector(".area-presentacion-fresco").classList.add("d-none");
            document.querySelector(".area-presentacion-congelado").classList.remove("d-none");
            console.log("Congelado");
            btnCongelado.classList.add("active");
            if (btnFresco) {

                btnFresco.classList.remove("active");
            }

            //cargar meses
            limpiarEstilosMeses();
            const calendario_congelado = frutas[frutaIndex].presentaciones.find(p => p.tipo === "congelado").calendario_produccion;
            const meses = document.querySelectorAll(".calendario-produccion .meses .mes");
            meses.forEach((mes, index) => {

                calendario_congelado.forEach(cal => {
                    // console.log(cal)
                    if (mes.dataset.mes == cal.mes) {
                        mes.style.backgroundColor = cal.color;
                        mes.style.color = cal.textColor;
                    }
                });
            });
            //cargar destinos
            const destinos = frutas[frutaIndex].presentaciones.find(p => p.tipo === "congelado").destinos;
            console.log(destinos);
            const contenedor_destinos = document.querySelector(".destinos");
            contenedor_destinos.innerHTML = "";
            destinos.forEach(destino => {
                contenedor_destinos.innerHTML += `
                    <div class="destino position-absolute" style="background-color:${destino.color_fondo}; top: ${destino.ubicacion_mapa.top}; left: ${destino.ubicacion_mapa.left};">
                        <img src="${destino.imagen ? destino.imagen : ""}" alt=""> ${destino.nombre}
                    </div>
                `;

            });



        });
    }

    const btnDefault = btnFresco || btnCongelado;
    btnDefault.click();
}

function limpiarEstilosMeses() {
    const meses = document.querySelectorAll(".calendario-produccion .meses .mes");
    meses.forEach((mes, index) => {
        mes.setAttribute("style", "");
    });
}