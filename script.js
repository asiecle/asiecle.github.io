let startTime = null;
let runningTime = 0; // Tiempo acumulado en milisegundos
let timerInterval;
let isRunning = true; // Indicador de si el cronómetro está corriendo o detenido

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000); // 1 minuto = 60,000 milisegundos
    let seconds = Math.floor((ms % 60000) / 1000); // Los segundos restantes
    let centiseconds = Math.floor((ms % 1000) / 10); // Centésimas de segundo

    return `${padZero(minutes)}:${padZero(seconds)}.${padZero(centiseconds)}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function startClock() {
    startTime = Date.now() - runningTime; // Iniciamos el cronómetro desde el tiempo acumulado
    timerInterval = setInterval(updateClock, 10); // Actualizamos cada 10ms
}

function updateClock() {
    runningTime = Date.now() - startTime; // Calculamos el tiempo transcurrido
    document.getElementById("time").textContent = formatTime(runningTime); // Mostramos el tiempo
}

function stopClock() {
    clearInterval(timerInterval); // Detenemos el cronómetro
    isRunning = false; // Marcamos el cronómetro como detenido
    document.getElementById("stopButton").textContent = "INICIAR"; // Cambiamos el texto del botón
    document.getElementById("continueButton").style.display = 'inline-block'; // Mostramos el botón de continuar
}

function continueClock() {
    if (!isRunning) {
        startClock(); // Reiniciamos el cronómetro desde donde se quedó
        document.getElementById("stopButton").textContent = "STOP"; // Restauramos el texto del botón
        document.getElementById("continueButton").style.display = 'none'; // Ocultamos el botón de continuar
        isRunning = true; // Indicamos que el cronómetro está corriendo
    }
}

// Iniciar el reloj al cargar la página
startClock();

// Agregar evento al botón de "Detener"
document.getElementById("stopButton").addEventListener("click", function() {
    if (isRunning) {
        stopClock(); // Detenemos el cronómetro si está corriendo
    } else {
        alert("El cronómetro ya está detenido");
    }
});

// Agregar evento al botón de "Continuar"
document.getElementById("continueButton").addEventListener("click", function() {
    continueClock(); // Reanudamos el cronómetro
});
