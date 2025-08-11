// Datos de ejemplo
const resultados = [
    { local: "La Victoria", golesLocal: 3, visitante: "Las Flores", golesVisitante: 1 },
    { local: "Villanueva", golesLocal: 2, visitante: "El Plan", golesVisitante: 2 },
    { local: "Dos Caminos", golesLocal: 0, visitante: "Pimienta", golesVisitante: 1 }
];

const goleadores = [
    { nombre: "Carlos López", equipo: "La Victoria", goles: 4 },
    { nombre: "Pedro Martínez", equipo: "Pimienta", goles: 3 },
    { nombre: "Juan Torres", equipo: "Las Flores", goles: 2 }
];

const porteros = [
    { nombre: "Luis García", equipo: "Villanueva", golesRecibidos: 1 },
    { nombre: "Mario Pérez", equipo: "La Victoria", golesRecibidos: 2 },
    { nombre: "José Díaz", equipo: "Pimienta", golesRecibidos: 3 }
];

// Mostrar resultados
function mostrarResultados() {
    const tabla = document.querySelector("#tablaResultados tbody");
    tabla.innerHTML = "";

    resultados.forEach(partido => {
        const ganador = partido.golesLocal > partido.golesVisitante
            ? partido.local
            : partido.golesLocal < partido.golesVisitante
            ? partido.visitante
            : "Empate";

        tabla.innerHTML += `
            <tr>
                <td>${partido.local}</td>
                <td>${partido.golesLocal}</td>
                <td>${partido.visitante}</td>
                <td>${partido.golesVisitante}</td>
                <td>${ganador}</td>
            </tr>
        `;
    });
}

// Mostrar goleadores
function mostrarGoleadores() {
    const tabla = document.querySelector("#tablaGoleadores tbody");
    tabla.innerHTML = "";

    goleadores
        .sort((a, b) => b.goles - a.goles)
        .forEach(jugador => {
            tabla.innerHTML += `
                <tr>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.equipo}</td>
                    <td>${jugador.goles}</td>
                </tr>
            `;
        });
}

// Mostrar portero menos batido
function mostrarPortero() {
    const tabla = document.querySelector("#tablaPortero tbody");
    tabla.innerHTML = "";

    porteros
        .sort((a, b) => a.golesRecibidos - b.golesRecibidos)
        .forEach(portero => {
            tabla.innerHTML += `
                <tr>
                    <td>${portero.nombre}</td>
                    <td>${portero.equipo}</td>
                    <td>${portero.golesRecibidos}</td>
                </tr>
            `;
        });
}

// Ejecutar funciones al cargar
mostrarResultados();
mostrarGoleadores();
mostrarPortero();
