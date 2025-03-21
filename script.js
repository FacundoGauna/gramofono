const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
let isPlaying = false;
let isDragging = false;
let rotation = null;

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault(); // Prevenir comportamientos inesperados
    isDragging = true;
}

// Función para mover la aguja
function moveNeedle(e) {
    if (!isDragging) return;

    // Detectar si es touch o mouse y obtener X
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Calcular el ángulo de la aguja
    let angle = Math.min(0, Math.max(-45, (window.innerWidth - clientX) / window.innerWidth * 90 - 45));
    needle.style.transform = rotate(${angle}deg);

    // Activar música cuando la aguja está fuera del centro
    if (angle <= -15 || angle >= 15) {
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
            disc.style.transform = rotate(${deg}deg);
            rotation = requestAnimationFrame(animate);
        }
    }
    animate();
}
