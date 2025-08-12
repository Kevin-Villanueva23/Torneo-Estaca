// Datos de los partidos ida y vuelta
const partidos = [
  { grupo: "A", equipo1: "Las Flores", ida1: 0, vuelta1: 0, equipo2: "Villanueva", ida2: 7, vuelta2: 3, vueltaNoCuenta: false },
  { grupo: "B", equipo1: "Dos Caminos", ida1: 6, vuelta1: null, equipo2: "El Plan", ida2: 13, vuelta2: null },
  { grupo: "C", equipo1: "La Victoria", ida1: 3, vuelta1: 5, equipo2: "Santiago", ida2: 9, vuelta2: 3 }
];

// Goleadores (suma goles ida + vuelta si corresponde)
const goleadoresData = [
  { nombre: "Eduar P", equipo: "Villanueva", goles: 4 },
  { nombre: "Marcos", equipo: "Villanueva", goles: 3 },
  { nombre: "Jhair C.", equipo: "Santiago", goles: 1 },
  { nombre: "Jhair Ortiz", equipo: "Santiago", goles: 5 },
  { nombre: "Autogol David", equipo: "Santiago", goles: 1 },
  { nombre: "Angel", equipo: "La Victoria", goles: 2 },
  { nombre: "Anubis", equipo: "La Victoria", goles: 2 },
  { nombre: "Dereck", equipo: "El Plan", goles: 10 },
  { nombre: "Kenny", equipo: "El Plan", goles: 1 },
  { nombre: "Ruben", equipo: "El Plan", goles: 1 },
  { nombre: "Luis", equipo: "El Plan", goles: 1 },
  { nombre: "Joshua", equipo: "Dos Caminos", goles: 5 },
  { nombre: "Jafeth", equipo: "Dos Caminos", goles: 1 },
  { nombre: "Alex", equipo: "Santiago", goles: 2 },
  { nombre: "Dennis", equipo: "Santiago", goles: 1 },
  { nombre: "Arturo", equipo: "La Victoria", goles: 1 },
  { nombre: "David", equipo: "La Victoria", goles: 3 }
];

// Lista de porteros por equipo
const porteros = {
  "Villanueva": "Cesar Cordon",
  "Las Flores": "Mahonrry Sanabria",
  "La Victoria": "Leny Vasquez",
  "Dos Caminos": "Cristhian",
  "Santiago": "FALTA NOMBRE",
  "El Plan": "FALTA NOMBRE"
};

// Calcular goles recibidos por equipo (sumando ida y vuelta, respetando vueltaNoCuenta)
function calcularGolesRecibidos() {
  const recibidos = {};

  partidos.forEach(p => {
    // Inicializar equipos en objeto
    if (!(p.equipo1 in recibidos)) recibidos[p.equipo1] = 0;
    if (!(p.equipo2 in recibidos)) recibidos[p.equipo2] = 0;

    // Sumar goles recibidos en ida
    recibidos[p.equipo1] += p.ida2 ?? 0;
    recibidos[p.equipo2] += p.ida1 ?? 0;

    // Sumar goles recibidos en vuelta solo si cuenta
    if (!p.vueltaNoCuenta) {
      recibidos[p.equipo1] += p.vuelta2 ?? 0;
      recibidos[p.equipo2] += p.vuelta1 ?? 0;
    }
  });

  return recibidos;
}

// Mostrar porteros menos batidos (ahora todos los equipos)
function mostrarPorterosMenosBatidos() {
  const recibidos = calcularGolesRecibidos();
  const tabla = document.querySelector("#tabla-porteros tbody");
  tabla.innerHTML = "";

  // Convertir a array y ordenar ascendente por goles recibidos
  const ordenados = Object.entries(recibidos)
    .map(([equipo, goles]) => ({
      equipo,
      portero: porteros[equipo] || "Desconocido",
      goles
    }))
    .sort((a,b) => a.goles - b.goles); // Mostrar todos

  // Insertar en la tabla
  ordenados.forEach(({equipo, portero, goles}) => {
    tabla.innerHTML += `<tr>
      <td>${equipo}</td>
      <td>${portero}</td>
      <td>${goles}</td>
    </tr>`;
  });
}

// Función para mostrar la tabla de resultados
function mostrarResultados() {
  const tbody = document.querySelector("#tabla-resultados tbody");
  tbody.innerHTML = "";
  partidos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.grupo}</td>
        <td>${p.equipo1}</td>
        <td>${p.ida1}</td>
        <td>${p.vueltaNoCuenta ? '-' : (p.vuelta1 ?? '-')}</td>
        <td>${p.equipo2}</td>
        <td>${p.ida2}</td>
        <td>${p.vueltaNoCuenta ? '-' : (p.vuelta2 ?? '-')}</td>
      </tr>
    `;
  });
}

// Función para sumar goles por jugador
function agruparGoleadores(datos) {
  const map = {};
  datos.forEach(g => {
    if (!map[g.nombre]) {
      map[g.nombre] = { ...g }; // copia
    } else {
      map[g.nombre].goles += g.goles;
    }
  });
  return Object.values(map);
}

// Mostrar goleadores ordenados
function mostrarGoleadores() {
  const tbody = document.querySelector("#tabla-goleadores tbody");
  tbody.innerHTML = "";
  const lista = agruparGoleadores(goleadoresData);
  lista.sort((a,b) => b.goles - a.goles);
  lista.forEach(g => {
    tbody.innerHTML += `<tr>
      <td>${g.nombre}</td>
      <td>${g.equipo}</td>
      <td>${g.goles}</td>
    </tr>`;
  });
}

// Calcular ganadores de grupo y mejor perdedor
function calcularGanadores() {
  const resultadosGrupos = {};

  partidos.forEach(p => {
    const golesEq1 = p.ida1 + (p.vueltaNoCuenta ? 0 : (p.vuelta1 ?? 0));
    const golesEq2 = p.ida2 + (p.vueltaNoCuenta ? 0 : (p.vuelta2 ?? 0));

    resultadosGrupos[p.grupo] = resultadosGrupos[p.grupo] || [];

    resultadosGrupos[p.grupo].push({
      equipo: p.equipo1,
      goles: golesEq1
    });
    resultadosGrupos[p.grupo].push({
      equipo: p.equipo2,
      goles: golesEq2
    });
  });

  const ganadores = {};
  Object.entries(resultadosGrupos).forEach(([grupo, equipos]) => {
    equipos.sort((a,b) => b.goles - a.goles);
    ganadores[grupo] = equipos[0].equipo;
  });

  const segundosLugares = [];
  Object.entries(resultadosGrupos).forEach(([grupo, equipos]) => {
    equipos.sort((a,b) => b.goles - a.goles);
    segundosLugares.push(equipos[1]);
  });
  segundosLugares.sort((a,b) => b.goles - a.goles);
  const mejorPerdedor = segundosLugares[0].equipo;

  return { ganadores, mejorPerdedor };
}

// Mostrar bracket simple
function mostrarBracket() {
  const { ganadores, mejorPerdedor } = calcularGanadores();

  const bracketDiv = document.getElementById("bracket");
  bracketDiv.innerHTML = "";

  // Semifinal 1: ganador A vs ganador C
  const sf1 = document.createElement("div");
  sf1.classList.add("round");
  sf1.innerHTML = `
    <div class="match">${ganadores.A} <br>⚔️<br> ${ganadores.C}</div>
  `;

  // Semifinal 2: ganador B vs mejor perdedor
  const sf2 = document.createElement("div");
  sf2.classList.add("round");
  sf2.innerHTML = `
    <div class="match">${ganadores.B} <br>⚔️<br> ${mejorPerdedor}</div>
  `;

  // Final
  const final = document.createElement("div");
  final.classList.add("round");
  final.innerHTML = `
    <div class="match">Ganador SF1 <br>⚔️<br> Ganador SF2</div>
  `;

  // Tercer lugar
  const tercer = document.createElement("div");
  tercer.classList.add("round");
  tercer.innerHTML = `
    <div class="match">Perdedor SF1 <br>⚔️<br> Perdedor SF2</div>
  `;

  bracketDiv.appendChild(sf1);
  bracketDiv.appendChild(final);
  bracketDiv.appendChild(sf2);
  bracketDiv.appendChild(tercer);
}

// Ejecutar todo
mostrarResultados();
mostrarGoleadores();
mostrarPorterosMenosBatidos();
mostrarBracket();
