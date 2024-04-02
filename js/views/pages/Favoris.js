import PokemonProvider from "../../services/PokemonProvider.js";

export default class Favoris {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    async render() {
        let view = /*html*/`
            <div class="container">
                <h1> Favoris </h1>
                <main>
                    <ul>
        `;

        for (let i = 0; i < this.favorites.length; i++) {
            let pokemon = await PokemonProvider.fetchPokemonByID(this.favorites[i]);
            view += /*html*/`
                <li>
                    <a href="/#/pokemon/${pokemon.id}">
                        <img src="${pokemon.img}" alt="${pokemon.name}">
                        <p>${pokemon.name["french"]}</p>
                    </a>
                </li>
            `;
        }

        view += /*html*/`
                    </ul>
                </main>
            </div>
        `;

        return view;
    }
}