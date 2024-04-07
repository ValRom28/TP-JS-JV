import PokemonProvider from "../../services/PokemonProvider.js";
import lazyLoad from "../../services/lazyloading.js";

export default class Favoris {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    renderFav(pokemon) {
        return /*html*/`
            <div class="col">
                <a href="#/pokemon/${pokemon.id}" class="card text-decoration-none shadow-sm">
                    <div class="card-body">
                        <p class="card-text">N°${pokemon.id}</p>
                        <h4 class="card-title">${pokemon.name["french"]}</h4>
                        <img data-src="${pokemon.img}" class="card-img-top lazy" alt="${pokemon.name}">
                    </div>
                </a>
            </div>
        `;
    }

    async render() {
        let view = /*html*/`
        <main>
            <h2>Favoris</h2>
            <div class="container">
                <div class="row row-cols-1 row-cols-md-3 g-4" id="pokemonList">
        `;

        for (let i = 0; i < this.favorites.length; i++) {
            let pokemon = await PokemonProvider.fetchPokemonByID(this.favorites[i]);
            view += this.renderFav(pokemon);
        }

        view += /*html*/`
                </div>
            </main>
        `;

        return view;
    }

    async after_render() {
        lazyLoad();
    }
}