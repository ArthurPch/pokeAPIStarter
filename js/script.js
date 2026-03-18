import Pokemon from './pokemon.js';

const main = document.querySelector('main');
const genSelect = document.getElementById('gen-select');
const sortSelect = document.getElementById('sort-select');
const typeFilters = document.getElementById('type-filters');

let pokedex = [];
let activeType = "Tous";

async function loadData() {
    try {
        const res = await fetch('./data/pokemon.json');
        if (!res.ok) throw new Error("Fichier JSON introuvable");
        const data = await res.json();
        
        pokedex = data.pokemon.map(p => new Pokemon(p));
        
        renderButtons();
        update();
    } catch (err) {
        main.innerHTML = `<p style="color:red; text-align:center;">Erreur : lancez le projet via Live Server.</p>`;
    }
}

function renderButtons() {
    typeFilters.innerHTML = "";
    const allTypes = pokedex.flatMap(p => p.arrTypes.map(t => t.name));
    const unique = ["Tous", ...new Set(allTypes)];

    unique.forEach(t => {
        const btn = document.createElement('button');
        btn.textContent = t;
        if (t === activeType) btn.style.fontWeight = "bold";
        btn.onclick = () => {
            activeType = t;
            renderButtons();
            update();
        };
        typeFilters.appendChild(btn);
    });
}

function update() {
    const sortBy = sortSelect.value;
    const gen = genSelect.value;

    const filtered = pokedex.filter(p => {
        const matchType = activeType === "Tous" || p.arrTypes.some(t => t.name === activeType);
        const matchGen = gen === "all" || (gen === "1" && p.id <= 151);
        return matchType && matchGen;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "id") return a.id - b.id;
        return (b[sortBy] || 0) - (a[sortBy] || 0);
    });

    render(sorted);
}

function render(list) {
    main.innerHTML = "";
    list.forEach(p => {
        main.appendChild(p.displayCard());
    });
}

genSelect.onchange = update;
sortSelect.onchange = update;

loadData();