// Lista de canciones
const canciones = [
    { nombre: "309", archivo: "cancion1.mp3" },
    { nombre: "Shape of You", archivo: "cancion2.mp3" },
    { nombre: "Perfect", archivo: "cancion3.mp3" },
    { nombre: "Galileo", archivo: "cancion4.mp3" },
    { nombre: "Terapia", archivo: "cancion5.mp3" },
    { nombre: "decisions", archivo: "cancion6.mp3" },
    { nombre: "Night Changes", archivo: "cancion7.mp3" },
    { nombre: "DTMF", archivo: "cancion8.mp3" },
    { nombre: "Se fue la pantera", archivo: "cancion9.mp3" },
    { nombre: "DR. Doctor", archivo: "cancion10.mp3" }
];

// Elementos HTML
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const reproducir = document.getElementById("reproducir");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const progreso = document.getElementById("progreso");
const volumen = document.getElementById("volumen");
const lista = document.getElementById("listaCanciones");

let indice = 0;

// Cargar canción
function cargarCancion(numero) {
    indice = numero;

    audio.src = "resources/" + canciones[indice].archivo;
    titulo.textContent = canciones[indice].nombre;

    document.querySelectorAll(".cancion").forEach((elemento, i) => {
        elemento.classList.toggle("activa", i === indice);
    });
}

// Crear lista de canciones
canciones.forEach((cancion, i) => {
    const elemento = document.createElement("article");

    elemento.className = "cancion";
    elemento.textContent = "🎵 " + cancion.nombre;

    elemento.addEventListener("click", () => {
        cargarCancion(i);
        audio.play();
        reproducir.textContent = "⏸";
    });

    lista.appendChild(elemento);
});

// Reproducir y pausar
reproducir.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        reproducir.textContent = "⏸";
    } else {
        audio.pause();
        reproducir.textContent = "▶";
    }
});

// Canción anterior
anterior.addEventListener("click", () => {
    indice--;

    if (indice < 0) {
        indice = canciones.length - 1;
    }

    cargarCancion(indice);
    audio.play();
    reproducir.textContent = "⏸";
});

// Siguiente canción
siguiente.addEventListener("click", () => {
    indice++;

    if (indice >= canciones.length) {
        indice = 0;
    }

    cargarCancion(indice);
    audio.play();
    reproducir.textContent = "⏸";
});

// Actualizar barra de progreso
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progreso.value = (audio.currentTime / audio.duration) * 100;
    }

    document.getElementById("actual").textContent =
        formatoTiempo(audio.currentTime);

    document.getElementById("duracion").textContent =
        formatoTiempo(audio.duration);
});

// Mover barra de progreso
progreso.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progreso.value / 100) * audio.duration;
    }
});

// Control de volumen
volumen.addEventListener("input", () => {
    audio.volume = volumen.value;
});

// Reproducir siguiente al terminar
audio.addEventListener("ended", () => {
    siguiente.click();
});

// Convertir segundos a minutos
function formatoTiempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";

    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.floor(segundos % 60);

    return minutos + ":" + segundosRestantes.toString().padStart(2, "0");
}

// Cargar primera canción
cargarCancion(0);