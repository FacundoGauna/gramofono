const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");

let isPlaying = false;
let isDragging = false;
let rotation = null;

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
}

// Función para mover la aguja (solo a la izquierda)
function moveNeedle(e) {
    if (!isDragging) return;

    // Detectar si es touch o mouse y obtener posición X
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Obtener el ancho de la ventana y centro de la pantalla
    let screenWidth = window.innerWidth;
    let centerX = screenWidth / 2;

    // Calcular ángulo basado en la posición del dedo o ratón
    let angle = ((centerX - clientX) / centerX) * 45; // Escalamos el valor de 0 a -45
    angle = Math.max(-45, Math.min(0, angle)); // Limitar entre 0° y -45°

    // Aplicar el ángulo corregido
    needle.style.transform = `rotate(${angle}deg)`;

    // Activar música cuando la aguja está lejos del centro
    if (angle <= -15) { 
        if (!isPlaying) {
            isPlaying = true;
            music.play();
            rotateDisc();
        }
    } else {
        if (isPlaying) {
            isPlaying = false;
            music.pause();
            cancelAnimationFrame(rotation);
        }
    }
}

// Función para detener el arrastre
function stopDrag(e) {
    e.preventDefault();
    isDragging = false;
}

// Agregar eventos de ratón y táctiles
needle.addEventListener("mousedown", startDrag);
needle.addEventListener("touchstart", startDrag, { passive: false });

document.addEventListener("mousemove", moveNeedle);
document.addEventListener("touchmove", moveNeedle, { passive: false });

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

// Función para girar el disco
function rotateDisc() {
    let deg = 0;
    function animate() {
        if (isPlaying) {
            deg = (deg + 1) % 360;
            disc.style.transform = `rotate(${deg}deg)`;
            rotation = requestAnimationFrame(animate);
        }
    }
    animate();
}
