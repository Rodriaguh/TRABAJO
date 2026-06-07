/* CONTROL DE ANIMACIÓN DE ENTRADA Y OCULTAMIENTO DE MENÚ */
let ultimoScroll = 0;
const banner = document.querySelector('.banner');

window.addEventListener('scroll', () => {
    const scrollActual = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollActual > ultimoScroll && scrollActual > 160) {
        banner.classList.add('oculto');
    } else {
        banner.classList.remove('oculto');
    }
    ultimoScroll = scrollActual <= 0 ? 0 : scrollActual;
});

/* ALMACENAMIENTO DE DATOS EN MEMORIA CACHÉ PARA FILTRADO ULTRA RÁPIDO */
let registrosActuales = [];

/* NÚCLEO DE CONSUMO ASÍNCRONO DE ALTA VELOCIDAD (FETCH + RENDERING OPTIMIZADO) */
async function cargarApi(evento) {
    const endpoint = evento.target.closest('.btn-tactical').name;
    const resultadoGrid = document.querySelector("#resultado");
    const panelHerramientas = document.querySelector("#panelHerramientas");
    const seccionHome = document.querySelector("#home");
    const url = `https://api.attackontitanapi.com/${endpoint}`;

    // Actualizar estados visuales de botones activos
    document.querySelectorAll('.btn-tactical').forEach(btn => btn.classList.remove('active'));
    evento.target.closest('.btn-tactical').classList.add('active');

    // Despejar vista inicial
    if (seccionHome) seccionHome.style.display = "none";
    panelHerramientas.style.display = "flex";
    document.querySelector("#buscador").value = ""; // Limpiar buscador previo

    // Buffer visual de procesamiento táctico
    resultadoGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px; font-family: var(--font-panel);">
            <div style="color: var(--titan-gold); font-size: 16px; letter-spacing: 3px; margin-bottom:10px;">PROCESANDO VECTOR DE DATOS EXTERNOS...</div>
            <div style="color: #64748b; font-size: 12px;">Estableciendo conexión encriptada...</div>
        </div>
    `;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Violación de segmento o fallo de red.");
        
        const datos = await respuesta.json();
        registrosActuales = datos.results; // Guardamos en memoria local para manipulación

        renderizarTarjetas(registrosActuales);

    } catch (error) {
        console.error("Error táctico de red: ", error);
        resultadoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; border: 1px dashed #ef4444; background: rgba(239,68,68,0.05); border-radius: 8px;">
                <h3 style="color: #ef4444; font-family: var(--font-panel); font-size: 14px;">FALLO DE ACCESO CRÍTICO</h3>
                <p style="color: #94a3b8; font-size: 13px; margin-top: 5px;">La base de datos externa no responde.</p>
            </div>
        `;
    }
}

/* MOTOR DE RENDERIZADO AUTOMATIZADO */
function renderizarTarjetas(lista) {
    const resultadoGrid = document.querySelector("#resultado");
    
    if (lista.length === 0) {
        resultadoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">
                No se encontraron registros que coincidan con la firma de búsqueda.
            </div>
        `;
        return;
    }

    let fragmentoHtml = "";
    lista.forEach((item, index) => {
        fragmentoHtml += `
            <div class="tarjeta" style="animation-delay: ${index * 0.03}s">
                <h3>${item.name}</h3>
                <div class="tarjeta-img-wrapper">
                    ${item.img 
                        ? `<img src="${item.img}" alt="${item.name}" loading="lazy">` 
                        : `<div style="height:100%; display:flex; align-items:center; justify-content:center; color:#475569; font-size:12px; background:rgba(0,0,0,0.3);">[SIN ARCHIVO VISUAL]</div>`
                    }
                </div>
            </div>
        `;
    });
    resultadoGrid.innerHTML = fragmentoHtml;
}

/* INTELIGENCIA LOCAL: BUSCADOR INSTANTÁNEO FILTRADO POR TEXTO */
function filtrarTarjetas() {
    const textoBusqueda = document.querySelector("#buscador").value.toLowerCase();
    const filtrados = registrosActuales.filter(item => 
        item.name.toLowerCase().includes(textoBusqueda)
    );
    renderizarTarjetas(filtrados);
}

/* INTELIGENCIA LOCAL: ORDENAMIENTO ALFABÉTICO */
let ordenAscendente = true;
function ordenarTarjetas() {
    registrosActuales.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return ordenAscendente ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return ordenAscendente ? 1 : -1;
        return 0;
    });
    ordenAscendente = !ordenAscendente; // Alternar orden para clics consecutivos
    document.querySelector(".btn-filter").innerText = ordenAscendente ? "🔤 Ordenar A-Z" : "🔤 Ordenar Z-A";
    filtrarTarjetas(); // Re-renderiza respetando si el usuario tenía algo escrito en el buscador
}

/* RETORNO AL MODO BASE (HOME) */
function irAlInicio() {
    document.querySelector("#resultado").innerHTML = "";
    document.querySelector("#panelHerramientas").style.display = "none";
    document.querySelector("#home").style.display = "block";
    
    document.querySelectorAll('.btn-tactical').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.btn-tactical[onclick="irAlInicio()"]').classList.add('active');
}

/* LÓGICA DE NAVEGACIÓN VERTICAL FLOTANTE */
const botonSubir = document.querySelector('#btnVolverArriba');

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 450 || window.pageYOffset > 450) {
        botonSubir.style.display = "flex";
    } else {
        botonSubir.style.display = "none";
    }
});

function subirAlInicio() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
const particles = document.getElementById("particles");

for(let i=0;i<80;i++){

    const p = document.createElement("div");

    p.classList.add("particula");

    p.style.left = Math.random()*100+"%";

    p.style.animationDuration =
        (5 + Math.random()*10)+"s";

    p.style.animationDelay =
        Math.random()*5+"s";

    particles.appendChild(p);
}
document.addEventListener("mousemove",(e)=>{

    document.querySelectorAll(".tarjeta").forEach(card=>{

        const rect = card.getBoundingClientRect();

        const x =
        (e.clientX - rect.left)/rect.width;

        const y =
        (e.clientY - rect.top)/rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (0.5 - y) * 12;

        card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;
    });

});