import PokemonProvider from "../../services/PokemonProvider.js";
import EquipeProvider from "../../services/EquipeProvider.js";
import ItemsProvider from "../../services/ItemsProvider.js";
import MovesProvider from "../../services/MovesProvider.js";

export default class Equipe {
    async render() {
        let equipe = await EquipeProvider.fetchEquipe();
        
        let htmlPromises = equipe.map(async membre => {
            console.log(membre);
            let pokemon = await PokemonProvider.fetchPokemonByID(membre.idPokemon);
            let objet = await  ItemsProvider.fetchItemByID(membre.idObjet);
            let move1 = await MovesProvider.getMove(membre.attaques[0]);
            let move2 = await MovesProvider.getMove(membre.attaques[1]);
            let move3 = await MovesProvider.getMove(membre.attaques[2]);
            let move4 = await MovesProvider.getMove(membre.attaques[3]);
            console.log(pokemon);
            return /*html*/`
                
            <div class="${membre.id} col-md-4 card mb-3 pokemon-equipe">
            <div class="card-body pokemon-class">
            <a href="#/pokemon/${pokemon.id}">
                <p class="card-text">N°${pokemon.id}</p>
                <h2 class="card-title">${pokemon.name["french"]}</h2>
                <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}" loading="lazy">
                </a>
            </div>
            <a href="#/item/${objet.id}">
            <div class="card-body objet-class">
                <h2 class="card-title">${objet.name["french"]}</h2>
                <img src="${objet.img}" class="card-img-top" alt="${objet.name}" loading="lazy">
            </div>
            </a>
            <div class="card-body attaque-class">
                <p class="card-text">Attaques</p>
                <a href="#/move/${move1.id}">
                <p class="${move1.type}">${move1.ename}</p>
                </a>
                <a href="#/move/${move2.id}">
                <p class="${move2.type}">${move2.ename}</p>
                        </a>
                <a href="#/move/${move3.id}">
                <p class="${move3.type}">${move3.ename}</p>
                        </a>
                <a href="#/move/${move4.id}">
                <p class="${move4.type}">${move4.ename}</p>
                        </a>

                    </div>
                    
                </div>
            `;
        });
        
        let htmlArray = await Promise.all(htmlPromises);
        let html = htmlArray.join('');
        
        return /*html*/`
        <h1 class="text-center"> Votre Equipe </h1>
            <div class="container">
                
                <div id="pokemonList" class="row equipe my-4">
                    ${html}
                </div>
            </div>
        `;
    }
    async after_render() {
        // Pas d'actions à effectuer après le rendu de la page
    }
}
