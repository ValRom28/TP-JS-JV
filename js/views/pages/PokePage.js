import PokemonProvider from "../../services/PokemonProvider.js";
import Utils from "../../services/Utils.js";

export default class PokePage {
    async render() {
        let request = Utils.parseRequestURL()
        let pokemon = await PokemonProvider.fetchPokemonByID(request.id);
        console.log(pokemon);
        function getColorClass(value) {
            if (value < 60) {
                return 'red';
            } else if (value < 100) {
                return 'orange';
            } else {
                return 'green';
            }
        }
        
        return /*html*/`
            <div class="container">
           
            <main>
                <p> N°${pokemon.id} </p>
                <h1> ${pokemon.name["french"]} </h1>
                <ul>
                <li> <p> ${pokemon.name["english"]} </p> </li>
                <li> <p> ${pokemon.name["japanese"]} </p> </li>
                <li> <p> ${pokemon.name["chinese"]} </p> </li>
                </ul>
                <img src="${pokemon.img}" alt="${pokemon.name}">
                <div class="note">
                
            </main>

            <aside>
            <h2> Types </h2>
            <ul>
            ${pokemon.type.map(type => `<li> <p class="${type}"> ${type} </p> </li>`).join('')}
            </ul>
            <h2> Stats </h2>
            <ul>
            <li>
            <p> HP : ${pokemon.base["HP"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["HP"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["HP"] / 2}%"></div>
            </div>
             </li>
            <li>
            <p> Attack : ${pokemon.base["Attack"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["Attack"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["Attack"] / 2}%"></div>
            </div>
             </li>
            <li>
            <p> Defense : ${pokemon.base["Defense"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["Defense"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["Defense"] / 2}%"></div>
            </div>
             </li>
            <li>
            <p> Sp. Attack : ${pokemon.base["Sp. Attack"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["Sp. Attack"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["Sp. Attack"] / 2}%"></div>
            </div>
             </li>
            <li>
            <p> Sp. Defense : ${pokemon.base["Sp. Defense"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["Sp. Defense"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["Sp. Defense"] / 2}%"></div>
            </div>
             </li>
            <li>
            <p> Speed : ${pokemon.base["Speed"]} </p>
            <div class="progress-bar ${getColorClass(pokemon.base["Speed"])}">
            <div class="progress-bar-value" style="width: ${pokemon.base["Speed"] / 2}%"></div>
            </div>
             </li>
            


            </ul>
        </aside>

            </div>
        `;
    }
    

    async after_render() {
        // Nothing to do here
    }
}