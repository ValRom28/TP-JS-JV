import PokemonProvider from "../../services/PokemonProvider.js";

export default class Home {
    async render() {
        let pokedex = await PokemonProvider.fetchPokedex();
        let html = "";
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
        return /*html*/`
            <main>
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        ${html}
                    </div>
                </div>
            </main>
        `;
    }
}
