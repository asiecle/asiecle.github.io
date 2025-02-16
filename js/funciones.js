// Datos de los CSVs

let datos80 = [];
let datos80v = [];
let datosPeso = [];
let datosLongitud = [];
let datosJabalina = [];
let datos1000 = [];
let datosAltura = [];
let datosDisco = [];
let datosMarcha = [];

 
function cargarCSV_New(url, callback,col) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
            return response.text();
        })
        .then(texto => {
            let datos = texto.split("\n").map(fila => fila.split(";")).slice(1);
            datos = datos.map(fila => [
                convertirFormato(fila[col]),
                parseInt(fila[col+1])
            ]);
             
            callback(datos);   
        })
        .catch(error => alert(error.message));
}

function clearInput(inputId, resultadoId, resultadoTotalId) {
    const input = document.getElementById(inputId);
    const inputResultado = document.getElementById(resultadoId);
    const inputResultadoTotal = document.getElementById(resultadoTotalId);
    inputResultado.innerText = '' // Oculta el resultado de puntos
    inputResultadoTotal.innerText = '' // Oculta el resultado de puntos total
    input.value = '';  // Borra el contenido
    input.focus();      // Coloca el cursor en el input
}

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los inputs del formulario
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Evita que el formulario se envíe
                
                // Mueve el foco al siguiente input si existe
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
});

function convertirFormato(valor) {
    if (valor.includes(":")) {
        let partes = valor.split(":");
        let minutos = parseInt(partes[0]);
        let segundos = parseFloat(partes[1].replace(",", "."));
        return minutos * 60 + segundos;
    } else {
        return parseFloat(valor.replace(",", "."));
    }
}
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80 = datos,0);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80v = datos,4);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosJabalina = datos,8);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosPeso = datos,12);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosDisco = datos,16);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosLongitud = datos,20);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosMarcha = datos,24);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos1000 = datos,28);
cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosAltura = datos,32);

function buscarPuntos(marca, datos) {
    
    if (datos.length === 0) {
        alert("Los datos aún no han sido cargados. Inténtalo de nuevo.");
        return null;
    }
   
    let marcaNum = convertirFormato(marca);
    let marcaMasCercana = datos.reduce((a, b) => 
       Math.abs(parseFloat(b[0]) - marcaNum) < Math.abs(parseFloat(a[0]) - marcaNum) ? b : a
    );

    if (!marcaMasCercana) {
        alert("La marca introducida no se encuentra en el archivo.");
        return null;
    }

    return marcaMasCercana[1]; 
}

function mostrarPuntos(inputId, resultadoId, datos, botonTotal) {
    let marca = document.getElementById(inputId).value.trim();
    if (!marca) {
        document.getElementById(resultadoId).innerText = "";
        return;
    }

    let puntos = marca == 0 ? 0 : buscarPuntos(marca, datos);
    if (puntos !== null) {
        document.getElementById(resultadoId).innerText = `Puntos: ${puntos}`;
    }
    let calPun = document.getElementById(botonTotal);

    let eventoClick = new Event("click");
    
    calPun.dispatchEvent(eventoClick); // Dispara el evento click
}

function calcularPuntos(datos1, datos2, datos3, marca1id, marca2id, marca3id, resultadoTotalid) {
    if (datos1.length === 0 || datos2.length === 0 || datos3.length === 0) {
        alert("Los archivos CSV aún no han sido cargados.");
        return;
    }

    let marca1 = document.getElementById(marca1id).value.trim();
    let marca2 = document.getElementById(marca2id).value.trim();
    let marca3 = document.getElementById(marca3id).value.trim();

   // if (!marca1 || !marca2 || !marca3) {
    //    alert("Introduce las tres marcas.");
   //     return;
   // }

    let puntos1 = marca1 == 0 ? 0: buscarPuntos(marca1, datos1);
    let puntos2 = marca2 == 0 ? 0: buscarPuntos(marca2, datos2);
    let puntos3 = marca3 == 0 ? 0: buscarPuntos(marca3, datos3);

    if (puntos1 === null || puntos2 === null || puntos3 === null) {
        return;
    }

    let puntosTotales = puntos1 + puntos2 + puntos3;

    document.getElementById(resultadoTotalid).innerText = `Puntos Totales: ${puntosTotales}`;
}
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function RecalculoDeMarcasSegunGenero() {
    
    await esperar(500); // Espera 500 ms
    
    let valorMarca80A = document.getElementById("marca80A");
    let valorMarca80vA = document.getElementById("marca80vA");
    let valorMarcaPesoA = document.getElementById("marcaPesoA");

    let valorMarca1000B = document.getElementById("marca1000B");
    let valorMarcaLongitudB = document.getElementById("marcaLongitudB");
    let valorMarcaJabalinaB = document.getElementById("marcaJabalinaB");

    let valorMarca80C = document.getElementById("marca80C");
    let valorMarcaAlturaC = document.getElementById("marcaAlturaC");
    let valorMarcaLongitudC = document.getElementById("marcaLongitudC");

    let valorMarca80D = document.getElementById("marca80D");
    let valorMarcaPesoD = document.getElementById("marcaPesoD");
    let valorMarcaDiscoD = document.getElementById("marcaDiscoD");

    let valorMarcaMarchaE = document.getElementById("marcaMarchaE");
    let valorMarca80E = document.getElementById("marca80E");
    let valorMarcaJabalinaE = document.getElementById("marcaJabalinaE");

    let eventoBlur = new Event("blur");
    
    valorMarca80A.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarca80vA.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaPesoA.dispatchEvent(eventoBlur); // Dispara el evento blur

    valorMarca1000B.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaLongitudB.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaJabalinaB.dispatchEvent(eventoBlur); // Dispara el evento blur

    valorMarca80C.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaAlturaC.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaLongitudC.dispatchEvent(eventoBlur); // Dispara el evento blur

    valorMarca80D.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaPesoD.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaDiscoD.dispatchEvent(eventoBlur); // Dispara el evento blur

    valorMarcaMarchaE.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarca80E.dispatchEvent(eventoBlur); // Dispara el evento blur
    valorMarcaJabalinaE.dispatchEvent(eventoBlur); // Dispara el evento blur

    let TotalA = document.getElementById("totalA");
    let TotalB = document.getElementById("totalB");
    let TotalC = document.getElementById("totalC");
    let TotalD = document.getElementById("totalD");
    let TotalE = document.getElementById("totalE");
    let eventoClick = new Event("click");
    TotalA.dispatchEvent(eventoClick); // Dispara el evento click
    TotalB.dispatchEvent(eventoClick); // Dispara el evento click
    TotalC.dispatchEvent(eventoClick); // Dispara el evento click
    TotalD.dispatchEvent(eventoClick); // Dispara el evento click
    TotalE.dispatchEvent(eventoClick); // Dispara el evento click
}
function toggleDivs() {
    const check = document.getElementById("toggleSwitch");
    
    // Cambia el texto de género en cada triatlón
    document.getElementById("GeneroA").textContent = check.checked ? "Masculino" : "Femenino";
    document.getElementById("GeneroB").textContent = check.checked ? "Masculino" : "Femenino";
    document.getElementById("GeneroC").textContent = check.checked ? "Masculino" : "Femenino";
    document.getElementById("GeneroD").textContent = check.checked ? "Masculino" : "Femenino";
    document.getElementById("GeneroE").textContent = check.checked ? "Masculino" : "Femenino";
    
    // Carga los datos según el género elegido
    if (check.checked) {
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80 = datos,2);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80v = datos,6);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosJabalina = datos,10);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosPeso = datos,14);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosDisco = datos,18);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosLongitud = datos,22);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosMarcha = datos,26);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos1000 = datos,30);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosAltura = datos,34);
    } else {
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80 = datos,0);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos80v = datos,4);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosJabalina = datos,8);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosPeso = datos,12);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosDisco = datos,16);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosLongitud = datos,20);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosMarcha = datos,24);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datos1000 = datos,28);
        cargarCSV_New("CSV/MarcasFemMas.csv", datos => datosAltura = datos,32);
    }
    // Una vez cargados los datos correctos recalculamos las marcas
    RecalculoDeMarcasSegunGenero();   

    // Marcas de corte según género
    document.getElementById("corte05A").textContent = check.checked ? "248" : "946";
    document.getElementById("corte10A").textContent = check.checked ? "472" : "1042";

    document.getElementById("corte05B").textContent = check.checked ? "678" : "824";
    document.getElementById("corte10B").textContent = check.checked ? "676" : "812";

    document.getElementById("corte05C").textContent = check.checked ? "484" : "932";
    document.getElementById("corte10C").textContent = check.checked ? "550" : "1031";

    document.getElementById("corte05D").textContent = check.checked ? "677" : "876";
    document.getElementById("corte10D").textContent = check.checked ? "799" : "892";

    document.getElementById("corte05E").textContent = check.checked ? "241" : "1071";
    document.getElementById("corte10E").textContent = check.checked ? "293" : "1150";

}
