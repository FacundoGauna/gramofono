const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
let isPlaying = false;
let isDragging = false;
let rotation = null;

// Detectar si es un dispositivo táctil
const isTouchDevice = "ontouchstart" in window;

// Función para iniciar el arrastre
function startDrag(e) {
    e.preventDefault(); // Evita comportamientos no deseados (scroll en móvil)
    isDragging = true;
}

// Función para mover la aguja
function moveNeedle(e) {
    if (!isDragging) return;

    // Si es táctil, tomar el primer punto de contacto
    let clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;

    // Calcular el ángulo basado en la posición del toque o ratón
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
function stopDrag(e) {
    e.preventDefault();
    isDragging = false;
}

// Usar eventos de puntero (funciona para mouse y touch)
needle.addEventListener("pointerdown", startDrag);
document.addEventListener("pointermove", moveNeedle);
document.addEventListener("pointerup", stopDrag);

// Extra: Manejo específico para táctiles si `pointerevents` no funciona
needle.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("touchmove", moveNeedle, { passive: false });
document.addEventListener("touchend", stopDrag, { passive: false });

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
