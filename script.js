const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
let isPlaying = false;
let isDragging = false;
let rotation = null;

// Detectar si es táctil
const isTouchDevice = "ontouchstart" in window;

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
}

// Función para mover la aguja
function moveNeedle(e) {
    if (!isDragging) return;

    // Obtener coordenadas del ratón o del dedo
    let clientX = e.clientX || e.touches?.[0]?.clientX || 0;

    // Calcular ángulo (ajustado para dispositivos móviles)
    let angle = Math.min(45, Math.max(-45, (window.innerWidth - clientX) / window.innerWidth * 90 - 45));
    needle.style.transform = `rotate(${angle}deg)`;

    // Activar música cuando la aguja está fuera del rango central
    if (angle <= -15 || angle >= 15) {
        if (!isPlaying) {
            isPlaying = true;
            music.play();
            rotateDisc();
        }
    } else if (isPlaying) { // Detener música cuando está centrado
        isPlaying = false;
        music.pause();
        cancelAnimationFrame(rotation);
    }
}

// Función para detener el arrastre
function stopDrag() {
    isDragging = false;
}

// Función para hacer girar el disco
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

// Eventos de puntero (funciona para mouse y touch)
needle.addEventListener("pointerdown", startDrag);
document.addEventListener("pointermove", moveNeedle);
document.addEventListener("pointerup", stopDrag);
