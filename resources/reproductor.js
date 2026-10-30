// Lista de canciones
const canciones = [
    { nombre: "309", artista: "NSQK", archivo: "cancion1.mp3", portada: "portada1.jpg" },
    { nombre: "1000 canciones", artista: "Alvaro Diaz", archivo: "cancion2.mp3", portada: "portada2.jpg" },
    { nombre: "La niña fresa", artista: "Banda Z", archivo: "cancion3.mp3", portada: "portada3.jpg" },
    { nombre: "Galileo", artista: "cometa a la deriva", archivo: "cancion4.mp3", portada: "portada4.jpg" },
    { nombre: "Terapia", artista: "lazaro suplika dopamina", archivo: "cancion5.mp3", portada: "portada5.jpg" },
    { nombre: "decisions", artista: "ElTaller", archivo: "cancion6.mp3", portada: "portada6.jpg" },
    { nombre: "How Sweet", artista: "NewJeans", archivo: "cancion7.mp3", portada: "portada7.jpg" },
    { nombre: "DTMF", artista: "Bad Bunny", archivo: "cancion8.mp3", portada: "portada8.jpg" },
    { nombre: "Se fue la pantera", artista: "Grupo Firme", archivo: "cancion9.mp3", portada: "portada9.jpg" },
    { nombre: "DR. Doctor", artista: "Emi blue", archivo: "cancion10.mp3", portada: "portada10.jpg" }
];


const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const imagenPortada = document.getElementById("imagenPortada");
const reproducir = document.getElementById("reproducir");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const progreso = document.getElementById("progreso");
const volumen = document.getElementById("volumen");
const lista = document.getElementById("listaCanciones");

let indice = 0;

function cargarCancion(numero) {
    indice = numero;

    audio.src = "resources/" + canciones[indice].archivo;
    titulo.textContent = canciones[indice].nombre;
    artista.textContent = canciones[indice].artista;
    imagenPortada.src = "resources/" + canciones[indice].portada;

    document.querySelectorAll(".cancion").forEach((elemento, i) => {
        elemento.classList.toggle("activa", i === indice);
    });
}

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

reproducir.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        reproducir.textContent = "⏸";
    } else {
        audio.pause();
        reproducir.textContent = "▶";
    }
});

anterior.addEventListener("click", () => {
    indice--;

    if (indice < 0) {
        indice = canciones.length - 1;
    }

    cargarCancion(indice);
    audio.play();
    reproducir.textContent = "⏸";
});

siguiente.addEventListener("click", () => {
    indice++;

    if (indice >= canciones.length) {
        indice = 0;
    }

    cargarCancion(indice);
    audio.play();
    reproducir.textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progreso.value = (audio.currentTime / audio.duration) * 100;
    }

    document.getElementById("actual").textContent =
        formatoTiempo(audio.currentTime);

    document.getElementById("duracion").textContent =
        formatoTiempo(audio.duration);
});

progreso.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progreso.value / 100) * audio.duration;
    }
});

volumen.addEventListener("input", () => {
    audio.volume = volumen.value;
});

audio.addEventListener("ended", () => {
    siguiente.click();
});

function formatoTiempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";

    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.floor(segundos % 60);

    return minutos + ":" + segundosRestantes.toString().padStart(2, "0");
}

cargarCancion(0);