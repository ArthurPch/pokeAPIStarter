export default class Type {
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