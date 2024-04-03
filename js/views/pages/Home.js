import PokemonProvider from "../../services/PokemonProvider.js";
import TypesProvider from "../../services/TypesProvider.js";

export default class Home {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
    }

    renderCard(pokemon) {
        return /*html*/`
            <div class="col">
                <a href="#/pokemon/${pokemon.id}" class="card text-decoration-none shadow-sm">
                    <div class="card-body">
                        <p class="card-text">N°${pokemon.id}</p>
                        <h4 class="card-title">${pokemon.name["french"]}</h4>
                        <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}" loading="lazy">
                    </div>
                </a>
            </div>
        `;
    }

    async render() {
        let types = await TypesProvider.fetchTypes();
        let pokedex = await PokemonProvider.fetchPokedex(this.currentPage, this.itemsPerPage);
        let pagination = this.renderPagination(pokedex.items);

        let html = "";
        let selector1 = "<select id='s1'> <option>Tous les types</option> "; 
        let selector2 = "<select id='s2'> <option>Tous les types</option> ";

        types.forEach(type => {
            selector1 += `<option> ${type.french} </option>`;
            selector2 += `<option> ${type.french} </option>`;
        });

        pokedex.data.forEach(pokemon => {
            html += this.renderCard(pokemon);
        });
        
        selector1 += "</select>"
        selector2 += "</select>"
        return /*html*/`
            <main>
            <h2>Pokedex</h2>
                ${selector1}
                ${selector2}
                <input type="text" id="search" placeholder="Rechercher un Pokémon">
                <button id="filterButton"> Rechercher </button>
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-3 g-4" id="pokemonList">
                        ${html}
                    </div>
                </div>
                <div id="pagination">${pagination}</div>
            </main>
        `;
    }

    async searchPokemonByName() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let pokedex = await PokemonProvider.fetchAllPokemon();

        let filteredPokemon = pokedex.filter(pokemon => pokemon.name["french"].toLowerCase().includes(searchValue));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            html += this.renderCard(pokemon);
        });
        document.getElementById('pokemonList').innerHTML = html;

        document.getElementById('pagination').style.display = 'none';
    }

    async searchPokemonByType() {
        let type1 = document.getElementById('s1').value;
        let type2 = document.getElementById('s2').value;
        type1 = await this.typeFrencheTotypeEnglish(type1);
        type2 = await this.typeFrencheTotypeEnglish(type2);
        
        let pokedex = await PokemonProvider.fetchAllPokemon();
        let filteredPokemon = pokedex.filter(pokemon => (pokemon.type.includes(type1)|| type1=="Tous les types") && (pokemon.type.includes(type2)|| type2== "Tous les types"));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            console.log(pokemon);
            html += this.renderCard(pokemon);
        });
        document.getElementById('pokemonList').innerHTML = html;

        document.getElementById('pagination').style.display = 'none';
    }
    
    async searchPokemonByNameAndType() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let type1 = document.getElementById('s1').value;
        let type2 = document.getElementById('s2').value;
        type1 = await this.typeFrencheTotypeEnglish(type1);
        type2 = await this.typeFrencheTotypeEnglish(type2);

        let pokedex = await PokemonProvider.fetchAllPokemon();
        let filteredPokemon = pokedex.filter(pokemon => pokemon.name["french"].toLowerCase().includes(searchValue) && (pokemon.type.includes(type1)|| type1=="Tous les types") && (pokemon.type.includes(type2)|| type2== "Tous les types"));
        let html = "";
        filteredPokemon.forEach(pokemon => {
            html += this.renderCard(pokemon);
        }
        );
        document.getElementById('pokemonList').innerHTML = html;

        document.getElementById('pagination').style.display = 'none';
    }

    async typeFrencheTotypeEnglish(typeF){
        if (typeF == "Tous les types") {
            return typeF;
        }
        else {
            let types = await TypesProvider.fetchTypes();
            let type = types.find(type => type.french == typeF);
            if (type) {
                return type.english;
            } else {
                // handle error, e.g. throw an error or return a default value
                throw new Error(`No type found for ${typeF}`);
            }
        }
    }
   
    renderPagination(totalItems) {
        let totalPages = Math.ceil(totalItems / this.itemsPerPage);
        let pages = '';

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                pages += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#/" data-page="${i}">${i}</a></li>`;
            } else {
                if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                    pages += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
                }
            }
        }

        let pagination = /*html*/ `
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#/" data-page="${this.currentPage - 1}" tabindex="-1" aria-disabled="true">Précédent</a>
                    </li>
                    ${pages}
                    <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#/" data-page="${this.currentPage + 1}">Suivant</a>
                    </li>
                </ul>
            </nav>
        `;
        return pagination;
    }

    async bindEvents() {
        const self = this;
        const updatePagination = async function(event) {
            event.preventDefault();
            let pageNumber = parseInt(this.getAttribute('data-page'));
            if (!isNaN(pageNumber)) {
                self.currentPage = pageNumber;
                let updatedContent = await self.render();
                let contentContainer = document.getElementById('content');
                contentContainer.innerHTML = updatedContent;
                self.bindEvents();
            }
        };
    
        document.querySelectorAll('.pagination a.page-link').forEach(link => {
            link.removeEventListener('click', updatePagination);
        });
    
        document.querySelectorAll('.pagination a.page-link').forEach(link => {
            link.addEventListener('click', updatePagination);
        });
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

