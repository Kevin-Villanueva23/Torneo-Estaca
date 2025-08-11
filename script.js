let goalkeepers = [];

function addGoalkeeper() {
    const name = document.getElementById('goalkeeperName').value.trim();
    const goals = parseInt(document.getElementById('goalsAgainst').value);

    if (name === '' || isNaN(goals)) {
        alert("Por favor, ingrese nombre y goles recibidos.");
        return;
    }

    goalkeepers.push({ name, goals });
    displayGoalkeepers();
    findBestGoalkeeper();

    document.getElementById('goalkeeperName').value = '';
    document.getElementById('goalsAgainst').value = '';
}

function displayGoalkeepers() {
    const list = document.getElementById('goalkeeperList');
    list.innerHTML = '';
    goalkeepers.forEach(gk => {
        const li = document.createElement('li');
        li.textContent = `${gk.name} - ${gk.goals} goles recibidos`;
        list.appendChild(li);
    });
}

function findBestGoalkeeper() {
    if (goalkeepers.length === 0) return;

    let best = goalkeepers.reduce((prev, curr) => {
        return curr.goals < prev.goals ? curr : prev;
    });

    document.getElementById('bestGoalkeeper').textContent =
        `🏆 Portero menos batido: ${best.name} (${best.goals} goles)`;
}
