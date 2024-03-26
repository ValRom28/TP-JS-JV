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
                    <div class="card shadow-sm">
                        <p>${pokemon.id}</p>
                        <h2>${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                        <div class="card-body"></div>
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
                <button id="filterButton"> Rechercher </button>
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        ${html}
                    </div>
            </main>
        `;
    }

    

    afterRender() {
    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', async () => {
        let type1 = document.getElementById('s1').value;
        let type2 = document.getElementById('s2').value;
        let pokedex = await PokemonProvider.fetchPokedex();
        let filteredPokedex = this.filterByType(type1, type2, pokedex);
        
        // Mettre à jour l'interface utilisateur avec les Pokémon filtrés
        let html = "";
        filteredPokedex.forEach(pokemon => {
            html += /*html*/`
                <div class="col">
                    <div class="card shadow-sm">
                        <p>${pokemon.id}</p>
                        <h2>${pokemon.name["french"]}</h2>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                        <div class="card-body"></div>
                    </div>
                </div>
            `;
        });

        const pokemonContainer = document.querySelector('.row-cols-md-3');
        pokemonContainer.innerHTML = html;
    });
}

}