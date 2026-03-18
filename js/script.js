const main = document.querySelector('main');
const genSelect = document.getElementById('gen-select');
const sortSelect = document.getElementById('sort-select');
const typeFilters = document.getElementById('type-filters');

let pokedex = [];
let activeType = "Tous";

class Type {
    constructor(typeName) {
        this.name = typeName;
        this.image = ""; 
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        switch (this.name.toLowerCase()) {
            case 'grass': return '#78C850';
            case 'fire': return '#F08030';
            case 'water': return '#6890F0';
            case 'bug': return '#A8B820';
            case 'normal': return '#A8A878';
            case 'poison': return '#A040A0';
            case 'electric': return '#F8D030';
            case 'ground': return '#E0C068';
            case 'fairy': return '#EE99AC';
            case 'fighting': return '#C03028';
            case 'psychic': return '#F85888';
            case 'rock': return '#B8A038';
            case 'ghost': return '#705898';
            case 'ice': return '#98D8D8';
            case 'dragon': return '#7038F8';
            case 'steel': return '#B8B8D0';
            case 'flying': return '#A890F0';
            default: return '#777777';
        }
    }
}

class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.arrTypes = data.types.map(t => new Type(t));
        
        this.hp = this.getStat(data, "hp");
        this.attack = this.getStat(data, "attack");
        this.defense = this.getStat(data, "defense");
        this.special_attack = this.getStat(data, "special-attack");
        this.special_defense = this.getStat(data, "special-defense");
        this.speed = this.getStat(data, "speed");
    }

    getStat(data, statName) {
        const stat = data.stats.find(s => s.name === statName);
        return stat ? stat.value : 0;
    }

    displayCard() {
        const art = document.createElement('article');
        const mainType = this.arrTypes[0];
        
        art.style.backgroundColor = `${mainType.color}15`;
        art.style.border = `2px solid ${mainType.color}`;

        const typesHTML = this.arrTypes.map(t => 
            `<span class="type-badge" style="background-color: ${t.color}; position: static; margin-right: 5px;">${t.name}</span>`
        ).join('');

        art.innerHTML = `
            <picture style="background-color: ${mainType.color}">
                <img src="${this.image}" alt="${this.name}">
            </picture>
            <figcaption>
                <div style="position: absolute; top: -15px; left: 20px; display: flex;">
                    ${typesHTML}
                </div>
                <h2>${this.name}</h2>
                <ol>
                    <li><strong>N° Pokedex :</strong> ${this.id}</li>
                    <li><strong>Points de vie :</strong> ${this.hp}</li>
                    <li><strong>Attaque :</strong> ${this.attack}</li>
                    <li><strong>Défense :</strong> ${this.defense}</li>
                    <li><strong>Attaque Spé. :</strong> ${this.special_attack}</li>
                    <li><strong>Défense Spé. :</strong> ${this.special_defense}</li>
                    <li><strong>Vitesse :</strong> ${this.speed}</li>
                </ol>
            </figcaption>
        `;
        return art;
    }
}

async function loadData() {
    try {
        const res = await fetch('./data/pokemon.json');
        const data = await res.json();
        pokedex = data.pokemon.map(p => new Pokemon(p));
        renderButtons();
        update();
    } catch (err) {
        main.innerHTML = "Erreur de chargement.";
    }
}

function renderButtons() {
    typeFilters.innerHTML = "";
    const allTypes = pokedex.flatMap(p => p.arrTypes.map(t => t.name));
    const unique = ["Tous", ...new Set(allTypes)];

    unique.forEach(t => {
        const btn = document.createElement('button');
        btn.textContent = t;
        if (t === activeType) btn.classList.add('active');
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