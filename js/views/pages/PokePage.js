import PokemonProvider from "../../services/PokemonProvider.js";
import Utils from "../../services/Utils.js";

export default class PokePage {
    async render() {
        let request = Utils.parseRequestURL()
        let pokemon = await PokemonProvider.fetchPokemonByID(request.id);
        let notes = await PokemonProvider.fetchnoteByID(request.id);
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= notes.notation) {
                stars += `<span class="star v-${i} filled">★</span>`;
            } else {
                stars += `<span class="star v-${i}">☆</span>`;
            }
        }
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
                <li> Note : ${stars} </li>
                </div>
                
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
    async updateStars(notation) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= notation) {
                stars += `<span class="star v-${i} filled">★</span>`;
                console.log("non");
            } else {
                stars += `<span class="star v-${i}">☆</span>`;
                console.log("oui");
            }
        }
        document.querySelector('.note').innerHTML = `<li> Note : ${stars} </li>`;
    }
    
    async after_render() {
        if (document.querySelector('.star')) {
            document.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', async () => {
                    let notation = star.classList[1].split('-')[1];
                    console.log(notation);
                    let request = Utils.parseRequestURL();
                    await PokemonProvider.addNoteById(request.id, notation);
                    let notes = await PokemonProvider.fetchnoteByID(request.id);
                    this.updateStars(notes.notation);
                    window.location.reload();
                });
            });
        }
    }
    
}

