import { getTypeColors } from './utils.js';

const main = document.querySelector('main');
const genSelect = document.getElementById('gen-select');
const sortSelect = document.getElementById('sort-select');
const typeFilters = document.getElementById('type-filters');

let pokedex = [];
let activeType = "Tous";

function getVal(p, key) {
    const s = p.stats.find(function(stat) {
        return stat.name === key;
    });

    if (s) {
        return s.value;
    } else {
        return 0;
    }
}

async function loadData() {
    try {
        const res = await fetch('./data/pokemon.json');
        const data = await res.json();
        pokedex = data.pokemon;
        
        renderButtons();
        update();
    } catch (err) {
        main.innerHTML = "Erreur de chargement du fichier JSON local.";
    }
}

function renderButtons() {
    typeFilters.innerHTML = "";
    
    const types = pokedex.flatMap(function(p) {
        return p.types;
    });
    const unique = ["Tous", ...new Set(types)];

    unique.forEach(function(t) {
        const btn = document.createElement('button');
        btn.textContent = t;
        btn.onclick = function() {
            activeType = t;
            update();
        };
        typeFilters.appendChild(btn);
    });
}

function update() {
    const sortBy = sortSelect.value;
    let filtered = [];

    if (activeType === "Tous") {
        filtered = pokedex;
    } else {
        filtered = pokedex.filter(function(p) {
            return p.types.includes(activeType);
        });
    }

    const sorted = filtered.sort(function(a, b) {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }
        if (sortBy === "id") {
            return a.id - b.id;
        }
        return getVal(b, sortBy) - getVal(a, sortBy);
    });

    render(sorted);
}

function render(list) {
    main.innerHTML = "";
    
    list.forEach(function(p) {
        const art = document.createElement('article');
        const type = p.types[0];
        
        const colors = getTypeColors(type);
        const color = colors.color;
        const light = colors.light;
        const border = colors.border;

        art.style.backgroundColor = light;
        art.style.border = border;

        art.innerHTML = `
            <picture style="background-color: ${color}">
                <img src="${p.image}" alt="${p.name}">
            </picture>
            <figcaption>
                <span class="type-badge">${type}</span>
                <h2>${p.name}</h2>
                <ol>
                    <li>Points de vie : ${getVal(p, "hp")}</li>
                    <li>Attaque : ${getVal(p, "attack")}</li>
                    <li>Défense : ${getVal(p, "defense")}</li>
                    <li>Attaque spécial : ${getVal(p, "special-attack")}</li>
                    <li>Vitesse : ${getVal(p, "speed")}</li>
                </ol>
            </figcaption>
        `;
        main.appendChild(art);
    });
}

genSelect.onchange = update;
sortSelect.onchange = update;

loadData();