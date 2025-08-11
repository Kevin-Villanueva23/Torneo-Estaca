// ==========================
// DATOS DEL TORNEO
// ==========================
const partidos = [
    { grupo: "A", equipo1: "Las Flores", ida1: 0, vuelta1: null, equipo2: "Villanueva", ida2: 7, vuelta2: null, vueltaNoCuenta: true },
    { grupo: "B", equipo1: "El Plan", ida1: 13, vuelta1: null, equipo2: "Dos Caminos", ida2: 6, vuelta2: null },
    { grupo: "C", equipo1: "Santiago", ida1: 9, vuelta1: 3, equipo2: "La Victoria", ida2: 3, vuelta2: 5 }
];

const goleadores = [
    { nombre: "Eduar P", goles: 4 },
    { nombre: "Marcos", goles: 3 },
    { nombre: "Dereck", goles: 10 },
    { nombre: "Joshua", goles: 5 },
    { nombre: "Jhair Ortiz", goles: 5 },
    { nombre: "David", goles: 3 },
    { nombre: "Anubis", goles: 2 }
];

// ==========================
// TABLA DE RESULTADOS
// ==========================
const tablaResultados = document.getElementById("tabla-resultados");
let html = "<table><tr><th>Grupo</th><th>Equipo 1</th><th>Ida</th><th>Vuelta</th><th>Equipo 2</th><th>Ida</th><th>Vuelta</th></tr>";
partidos.forEach(p => {
    html += `<tr>
        <td>${p.grupo}</td>
        <td>${p.equipo1}</td>
        <td>${p.ida1}</td>
        <td>${p.vuelta1 ?? "-"}</td>
        <td>${p.equipo2}</td>
        <td>${p.ida2}</td>
        <td>${p.vuelta2 ?? "-"}</td>
    </tr>`;
});
html += "</table>";
tablaResultados.innerHTML = html;

// ==========================
// GOLEADORES ORDENADOS
// ==========================
const listaGoleadores = document.getElementById("lista-goleadores");
goleadores.sort((a, b) => b.goles - a.goles).forEach(g => {
    const li = document.createElement("li");
    li.textContent = `${g.nombre} - ${g.goles} goles`;
    listaGoleadores.appendChild(li);
});

// ==========================
// CALCULAR GOLES RECIBIDOS
// ==========================
function calcularGolesRecibidos(partidos) {
    const recibidos = {};

    partidos.forEach(p => {
        if (!(p.equipo1 in recibidos)) recibidos[p.equipo1] = 0;
        if (!(p.equipo2 in recibidos)) recibidos[p.equipo2] = 0;

        // Ida
        if (typeof p.ida1 === "number" && typeof p.ida2 === "number") {
            recibidos[p.equipo1] += p.ida2;
            recibidos[p.equipo2] += p.ida1;
        }

        // Vuelta (si cuenta)
        if (!p.vueltaNoCuenta) {
            if (typeof p.vuelta1 === "number" && typeof p.vuelta2 === "number") {
                recibidos[p.equipo1] += p.vuelta2;
                recibidos[p.equipo2] += p.vuelta1;
            }
        }
    });

    return recibidos;
}

function mostrarPorteroMenosBatido(partidos) {
    const recibidos = calcularGolesRecibidos(partidos);
    const lista = Object.entries(recibidos).map(([equipo, goles]) => ({equipo, goles}));
    lista.sort((a, b) => a.goles - b.goles);

    let cont = document.getElementById("mejor-portero");
    if (!cont) {
        cont = document.createElement("div");
        cont.id = "mejor-portero";
        cont.style.padding = "1rem";
        cont.style.margin = "1rem";
        cont.style.borderRadius = "8px";
        cont.style.background = "#e6fffa";
        document.querySelector("main").prepend(cont);
    }

    cont.innerHTML = `<h3>🏆 Portero menos batido</h3>
        <p style="font-weight:bold">${lista[0].equipo} — ${lista[0].goles} goles recibidos</p>`;

    let tab = "<table style='width:100%;border-collapse:collapse'><tr><th>Equipo</th><th>Goles recibidos</th></tr>";
    lista.forEach(row => {
        const highlight = row.equipo === lista[0].equipo ? "background:#d1fae5;font-weight:700" : "";
        tab += `<tr style="${highlight}"><td style="padding:6px;border:1px solid #ddd">${row.equipo}</td><td style="padding:6px;border:1px solid #ddd;text-align:center">${row.goles}</td></tr>`;
    });
    tab += "</table>";
    cont.innerHTML += tab;
}

mostrarPorteroMenosBatido(partidos);

// ==========================
// BRACKET CON LLAVES
// ==========================
const bracket = [
    { ronda: "Semifinal 1", equipo1: "Ganador Grupo A", equipo2: "Ganador Grupo C" },
    { ronda: "Semifinal 2", equipo1: "Ganador Grupo B", equipo2: "Mejor Perdedor" },
    { ronda: "Final", equipo1: "Ganador SF1", equipo2: "Ganador SF2" },
    { ronda: "Tercer Lugar", equipo1: "Perdedor SF1", equipo2: "Perdedor SF2" }
];

const bracketContainer = document.getElementById("bracket-container");
bracket.forEach(b => {
    const box = document.createElement("div");
    box.className = "bracket-box";
    box.innerHTML = `<strong>${b.ronda}</strong><br>${b.equipo1} <br>⚔️<br> ${b.equipo2}`;
    bracketContainer.appendChild(box);
});
