import PokemonProvider from "../../services/PokemonProvider.js";

export default class Home {
    async render() {
        let types = await PokemonProvider.fetchTypes();
        let pokedex = await PokemonProvider.fetchPokedex();
        let html = "";
        let selector1 = "<select id='s1'> <option>Tous les types</option> "; 
        let selector2 = "<select id='s2'> <option>Tous les types</option> ";

        types.forEach(type => {
            selector1+= `<option> ${type.french} </option>`;
            selector2+= `<option> ${type.french} </option>`;
        });

        pokedex.forEach(pokemon => {
            html += /*html*/`
                <div class="col">
                    <div class="card">
                        <p class="card-text">${pokemon.id}</p>
                        <h2 class="card-title">${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                    </div>
                </div>
            `;
        });
        
        selector1+="</select>"
        selector2+="</select>"
        return /*html*/`
            <main>
            <h1> POKEDEX </h1>
                ${selector1}
                ${selector2}
                <input type="text" id="search" placeholder="Rechercher un Pokémon">
                <button id="filterButton"> Rechercher </button>
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-3 g-4" id="pokemonList">
                        ${html}
                    </div>
            </main>
        `;
    }

    async searchPokemonByName() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let pokedex = await PokemonProvider.fetchPokedex();
        let filteredPokemon = pokedex.filter(pokemon => pokemon.name["french"].toLowerCase().includes(searchValue));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            html += /*html*/`
                <div class="col">
                    <div class="card">
                        <p class="card-text">${pokemon.id}</p>
                        <h2 class="card-title">${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                    </div>
                </div>
            `;
        });
        document.getElementById('pokemonList').innerHTML = html;
    }
    async searchPokemonByType() {
        let type1 = document.getElementById('s1').value;
        type1 = await this.typeFrencheTotypeEnglish(type1);
        console.log(type1);
        let type2 = document.getElementById('s2').value;
        type2 = await this.typeFrencheTotypeEnglish(type2);
        let pokedex = await PokemonProvider.fetchPokedex();
        let filteredPokemon = pokedex.filter(pokemon => (pokemon.type.includes(type1)|| type1=="Tous les types") && (pokemon.type.includes(type2)|| type2== "Tous les types"));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            console.log(pokemon);
            html += /*html*/`
                <div class="col">
                    <div class="card">
                        <p class="card-text">${pokemon.id}</p>
                        <h2 class="card-title">${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                    </div>
                </div>
            `;
        });
        document.getElementById('pokemonList').innerHTML = html;
    }
    async typeFrencheTotypeEnglish(typeF){
        if (typeF == "Tous les types") {
            return typeF;
        }
        else{
        let types = await PokemonProvider.fetchTypes();
        let type = types.find(type => type.french == typeF);
        if (type) {
            return type.english;
        } else {
            // handle error, e.g. throw an error or return a default value
            throw new Error(`No type found for ${typeF}`);
        }
    }
    }
    async searchPokemonByNameAndType() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let type1 = document.getElementById('s1').value;
        type1 = await this.typeFrencheTotypeEnglish(type1);
        let type2 = document.getElementById('s2').value;
        type2 = await this.typeFrencheTotypeEnglish(type2);
        let pokedex = await PokemonProvider.fetchPokedex();
        let filteredPokemon = pokedex.filter(pokemon => pokemon.name["french"].toLowerCase().includes(searchValue) && (pokemon.type.includes(type1)|| type1=="Tous les types") && (pokemon.type.includes(type2)|| type2== "Tous les types"));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            html += /*html*/`
                <div class="col">
                    <div id="${pokemon.id}" class="card">
                        <p class="card-text">${pokemon.id}</p>
                        <h2 class="card-title">${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                    </div>
                    </div>
            `;
        }
        );
        document.getElementById('pokemonList').innerHTML = html;
    }
   

    after_render() {
        let filterButton = document.getElementById('filterButton');
        if (filterButton) {
            filterButton.addEventListener('click', () => {
                console.log("Button clicked"); // Vérifier si le bouton est cliqué
                let type1= document.getElementById('s1').value;
                let type2= document.getElementById('s2').value;
                let search= document.getElementById('search').value;
                if (type1 == "Tous les types" && type2 == "Tous les types") {
                    this.searchPokemonByName();
                }
                else if (search == "") {
                    this.searchPokemonByType();
                }
                else {
                    this.searchPokemonByNameAndType();
                }
            });
        } else {
            console.log("Filter button not found"); // Vérifier si le bouton est trouvé
        }
    }
}

