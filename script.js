const needle = document.getElementById("needle");
const disc = document.getElementById("disc");
const music = document.getElementById("music");
let isPlaying = false;
let isDragging = false;

needle.addEventListener("mousedown", () => { 
    isDragging = true; 
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // Invertir la dirección del cálculo del ángulo.
        let angle = Math.min(45, Math.max(-45, (window.innerWidth - e.clientX) / window.innerWidth * 90 - 45));
        needle.style.transform = `rotate(${angle}deg)`; // Rotar la aguja

        // Comprobar si la aguja está fuera del disco (fuera del rango de -15 a 15)
        if (angle <= -15 || angle >= 15) {  // Activamos la música si está fuera de ese rango
            if (!isPlaying) {
                isPlaying = true;
                music.play(); // Reproducir el archivo MP3
                rotateDisc();
            }
        } else if (angle > -15 && angle < 15 && isPlaying) {  // Detenemos cuando está centrado
            isPlaying = false;
            music.pause(); // Detener la música
            cancelAnimationFrame(rotation);
        }
    }
});

document.addEventListener("mouseup", () => { 
    isDragging = false; 
});

// Función para hacer girar el disco
let rotation = null;
function rotateDisc() {
    let deg = 0;
    function animate() {
        if (isPlaying) {
            deg = (deg + 1) % 360; // Hacer que el disco gire
            disc.style.transform = `rotate(${deg}deg)`; // Aplicar la rotación al disco
            rotation = requestAnimationFrame(animate); // Continuar la animación
        }
    }
    animate();
}
