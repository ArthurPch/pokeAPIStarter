export function getTypeColors(type) {
    let color, light, border;
    switch (type.toLowerCase()) {
        case "grass":
            color = "#008000"; light = "#8fbc8f"; border = "12px solid #006400";
            break;
        case "poison":
            color = "#A040A0"; light = "#D28CD2"; border = "12px solid #682A68";
            break;
        case "fire":
            color = "#e69138"; light = "#fce5cd"; border = "12px solid #b45f06";
            break;
        case "flying":
            color = "#A890F0"; light = "#C6B7F5"; border = "12px solid #6D5E9C";
            break;
        case "water":
            color = "#0000ff"; light = "#9999ff"; border = "12px solid #00008b";
            break;
        case "bug":
            color = "#A8B820"; light = "#D8E29D"; border = "12px solid #6D7815";
            break;
        case "normal":
            color = "#A8A878"; light = "#E2E2D0"; border = "12px solid #6D6D4E";
            break;
        case "electric":
            color = "#F8D030"; light = "#FAE078"; border = "12px solid #B8A038";
            break;
        case "ground":
            color = "#E0C068"; light = "#EBD69D"; border = "12px solid #927D44";
            break;
        case "fairy":
            color = "#EE99AC"; light = "#F4BDC9"; border = "12px solid #9B6470";
            break;
        case "fighting":
            color = "#C03028"; light = "#D67873"; border = "12px solid #7D1F1A";
            break;
        case "psychic":
            color = "#F85888"; light = "#FA92B2"; border = "12px solid #A13959";
            break;
        case "rock":
            color = "#B8A038"; light = "#D1C17D"; border = "12px solid #786824";
            break;
        case "steel":
            color = "#B8B8D0"; light = "#D1D1E0"; border = "12px solid #787887";
            break;
        case "ice":
            color = "#98D8D8"; light = "#BCE6E6"; border = "12px solid #638D8D";
            break;
        case "ghost":
            color = "#705898"; light = "#A292BC"; border = "12px solid #493963";
            break;
        case "dragon":
            color = "#7038F8"; light = "#A27DFA"; border = "12px solid #4924A1";
            break;
        default:
            color = "#A8A878"; light = "#E2E2D0"; border = "12px solid #6D6D4E";
    }
    return { color, light, border };
}