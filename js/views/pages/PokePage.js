import PokemonProvider from "../../services/PokemonProvider.js";
import Utils from "../../services/Utils.js";

export default class PokePage {
    async render() {
        let request = Utils.parseRequestURL()
        let pokemon = await PokemonProvider.fetchPokemonByID(request.id);
        console.log(pokemon);
        return /*html*/`
            <aside>
                <h2> Types </h2>
                <ul>
                ${pokemon.type.map(type => `<li> ${type} </li>`).join('')}
                </ul>
                <h2> Stats </h2>
                <ul>
                <li> <p> HP : ${pokemon.base["HP"]} </p> </li>
                <li> <p> Attack : ${pokemon.base["Attack"]} </p> </li>
                <li> <p> Defense : ${pokemon.base["Defense"]} </p> </li>
                <li> <p> Sp. Attack : ${pokemon.base["Sp. Attack"]} </p> </li>
                <li> <p> Sp. Defense : ${pokemon.base["Sp. Defense"]} </p> </li>
                <li> <p> Speed : ${pokemon.base["Speed"]} </p> </li>
                </ul>
            </aside>
            <main>
                <p> ${pokemon.id} </p>
                <h1> ${pokemon.name["french"]} </h1>
                <ul>
                <li> <p> ${pokemon.name["english"]} </p> </li>
                <li> <p> ${pokemon.name["japanese"]} </p> </li>
                <li> <p> ${pokemon.name["chinese"]} </p> </li>
                </ul>
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </main>
        `;
    }

    async after_render() {
        // Nothing to do here
    }
}