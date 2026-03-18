import Type from './type.js';

export default class Pokemon {
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