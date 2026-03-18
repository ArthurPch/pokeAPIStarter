import { getTypeColors } from './utils.js';

const main = document.querySelector('main');
const genSelect = document.getElementById('gen-select');
const sortSelect = document.getElementById('sort-select');
const typeFilters = document.getElementById('type-filters');

let pokedex = [];
let activeType = "Tous";

const getStat = (p, key) => {
    const s = p.stats.find(stat => stat.name === key);
    return s ? s.value : 0;
};

async function loadData() {
    try {
        const res = await fetch('./data/pokemon.json');
        const data = await res.json();
        pokedex = data.pokemon;
        renderButtons();
        update();
    } catch (err) {
        main.innerHTML = "Erreur de chargement du fichier JSON.";
    }
}

function renderButtons() {
    typeFilters.innerHTML = "";
    const types = pokedex.flatMap(p => p.types);
    const unique = ["Tous", ...new Set(types)];

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
        const matchType = activeType === "Tous" || p.types.includes(activeType);
        const matchGen = gen === "all" || (gen === "1" && p.id <= 151);
        return matchType && matchGen;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "id") return a.id - b.id;
        return getStat(b, sortBy) - getStat(a, sortBy);
    });

    render(sorted);
}

function render(list) {
    main.innerHTML = "";
    list.forEach(p => {
        const art = document.createElement('article');
        const type = p.types[0];
        const colors = getTypeColors(type);

        art.style.backgroundColor = colors.light;
        art.style.border = `2px solid ${colors.border}`;

        art.innerHTML = `
            <picture style="background-color: ${colors.color}">
                <img src="${p.image}" alt="${p.name}">
            </picture>
            <figcaption>
                <span class="type-badge" style="background-color: ${colors.border}">${type}</span>
                <h2>${p.name}</h2>
                <ol>
                    <li>HP: ${getStat(p, "hp")}</li>
                    <li>ATK: ${getStat(p, "attack")}</li>
                    <li>DEF: ${getStat(p, "defense")}</li>
                    <li>SPD: ${getStat(p, "speed")}</li>
                </ol>
            </figcaption>
        `;
        main.appendChild(art);
    });
}

genSelect.onchange = update;
sortSelect.onchange = update;

loadData();