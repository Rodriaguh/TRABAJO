// ==========================================
// 1. CONTROL DEL BANNER COMPACTO AL ESCROLEAR
// ==========================================
window.addEventListener("scroll", function() {
    const header = document.querySelector(".banner");
    
    // Se activa de forma segura a los 150px para evitar el bucle de temblor
    if (window.scrollY > 150) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// ==========================================
// 2. CONTROL DE LA VENTANA MODAL (TURNOS)
// ==========================================
const modal = document.getElementById("modal-turno");
const btnCita = document.querySelector(".boton-cta");
const btnCerrar = document.querySelector(".cerrar-modal");

// Abrir la ventana con el botón dorado
if (btnCita) {
    btnCita.addEventListener("click", function(event) {
        event.preventDefault(); 
        modal.style.display = "flex"; 
    });
}

// Cerrar la ventana al tocar la 'X'
if (btnCerrar) {
    btnCerrar.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

// Cerrar la ventana si hacen clic en el fondo oscuro exterior
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});