import PokemonProvider from "../../services/PokemonProvider.js";
import NoteProvider from "../../services/NoteProvider.js";
import ShinyProvider from "../../services/ShinyProvider.js";
import Utils from "../../services/Utils.js";
import EquipeProvider from "../../services/EquipeProvider.js";

export default class PokePage {
    constructor() {
        this.notation = 0;
    }

    async render() {
        let request = Utils.parseRequestURL()
        let pokemon = await PokemonProvider.fetchPokemonByID(request.id);
        this.notation = await NoteProvider.fetchNoteByID(request.id);
        this.notation = this.notation.notation;
        
        function getColorClass(value) {
            if (value < 60) {
                return 'red';
            } else if (value < 70) {
                return 'superorange';
            } else if (value < 100) {
                return 'orange';
            } else if (value < 120) {
                return 'green';
            } else if (value < 150) {
                return 'supergreen';
            } else {
                return 'blue';
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
                <p class="color"> ✨ </p>
                <img src="${pokemon.img}" alt="${pokemon.name}" class="normal">
                <div class="note">
                <li> Note : ${this.renderStars()} </li>
                </div>
                <button class="addEquipe"> Ajouter à l'équipe </button>
                <select id="position">
                <option class=pos-1> 1 </option>
                <option class=pos-2> 2 </option>
                <option class=pos-3> 3 </option>
                <option class=pos-4> 4 </option>
                <option class=pos-5> 5 </option>
                <option class=pos-6> 6 </option>
                </select>

                
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

    renderStars() {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= this.notation) {
                stars += `<span class="star v-${i} filled">★</span>`;
            } else {
                stars += `<span class="star v-${i}">★</span>`;
            }
        }
        return stars;
    }

    async updateStars() {
        if (document.querySelector('.star')) {
            document.querySelectorAll('.star').forEach(star => {
                let value = parseInt(star.classList[1].split('-')[1]);
                if (value <= this.notation) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        }
    }

    async shiny() {
        let request = Utils.parseRequestURL();
        if (document.querySelector('img.shiny')) {
            let pokemon = await PokemonProvider.fetchPokemonByID(request.id);
            let normal = pokemon.img;
            document.querySelector('img.shiny').src = normal;
            document.querySelector('img.shiny').classList.add("normal");
            document.querySelector('img.shiny').classList.remove("shiny");
        }
        else {
            let pokemon = await ShinyProvider.fetchPokemonShiny(request.id);
            let shiny = pokemon.img;
            document.querySelector('img.normal').src = shiny;
            document.querySelector('img.normal').classList.add("shiny");
            document.querySelector('img.normal').classList.remove("normal");
        }
    }
    
    async addEquipe() {
        let request = Utils.parseRequestURL();
        let position = document.getElementById('position').value;
        await EquipeProvider.fetchSwitchPokemoninEquipe(position, request.id);
    }
    
    async after_render() {
        if (document.querySelector('.star')) {
            document.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', async () => {
                    let request = Utils.parseRequestURL();
                    this.notation = parseInt(star.classList[1].split('-')[1]);
                    await NoteProvider.addNoteById(request.id, this.notation);
                    this.updateStars();
                });
            });
        }
        if (document.querySelector('.color')) {
            document.querySelector('.color').addEventListener('click', async () => {
                this.shiny();
            });
        }
        if (document.querySelector('.addEquipe')) {
            document.querySelector('.addEquipe').addEventListener('click', async () => {
                 await this.addEquipe();
                window.location.href = '#/equipe';
                console.log("Ajouté à l'équipe");
            });
        }
    }
    
}

