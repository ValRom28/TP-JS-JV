import MovesProvider from "../../services/MovesProvider.js";
import TypesProvider from "../../services/TypesProvider.js";

export default class Moves {
    constructor() {
        this.moves = [];
        this.currentPage = 1;
        this.itemsPerPage = 24;
    }

    async render() {
        this.moves = await MovesProvider.getMoves(this.currentPage, this.itemsPerPage);
        let pagination = this.renderPagination(this.moves.items);
        
        // Récupérer les types de capacités
        let types = await TypesProvider.fetchTypes();

        // Générer les options de sélection pour les types
        let typeOptions = "<option>Tous les types</option>";
        types.forEach(type => {
            typeOptions += `<option>${type.french}</option>`;
        });

        // Vue de la page avec les champs de recherche
        return `
            <h2>Toutes les capacités</h2>
            <div>
                <input type="text" id="search" placeholder="Rechercher une capacité">
                <select id="typeSelect">${typeOptions}</select>
                <button id="filterButton">Rechercher</button>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4" id="moveList">
                ${this.moves.data.map(move => 
                    /*html*/ `
                    <div class="col">
                        <a href="#/move/${move.id}" class="card shadow-sm text-decoration-none">
                            <div class="card-body">
                                <h4 class="card-title">${move.ename}</h4>
                                <p class="${move.type}">${move.type}</p>
                            </div>
                        </a>
                    </div>`
                ).join('\n')}
            </div>
            <div id="pagination">${pagination}</div>
        `;
    }

    async typeFrencheToTypeEnglish(typeF){
        if (typeF == "Tous les types") {
            return typeF;
        }
        else {
            let types = await TypesProvider.fetchTypes();
            let type = types.find(type => type.french == typeF);
            if (type) {
                return type.english;
            } else {
                throw new Error(`No type found for ${typeF}`);
            }
        }
    }

    async searchMoveByName() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let moves = await MovesProvider.getAllMoves();

        let filteredMoves = moves.filter(move => move.ename.toLowerCase().includes(searchValue));
        let view = "";
        filteredMoves.forEach(move => {
            view += /*html*/ `
                <div class="col">
                    <a href="#/move/${move.id}" class="card shadow-sm text-decoration-none">
                        <div class="card-body">
                            <h4 class="card-title">${move.ename}</h4>
                            <p class="${move.type}">${move.type}</p>
                        </div>
                    </a>
                </div>
            `;
        });
        
        document.getElementById('moveList').innerHTML = view;
        document.getElementById('pagination').style.display = 'none';
    }

    async searchMoveByType() {
        let selectedType = document.getElementById('typeSelect').value;
        selectedType = await this.typeFrencheToTypeEnglish(selectedType);
        let moves = await MovesProvider.getAllMoves();

        let filteredMoves = moves.filter(move => move.type === selectedType || selectedType === 'Tous les types');
        let view = "";
        filteredMoves.forEach(move => {
            view += /*html*/ `
                <div class="col">
                    <a href="#/move/${move.id}" class="card shadow-sm text-decoration-none">
                        <div class="card-body">
                            <h4 class="card-title">${move.ename}</h4>
                            <p class="${move.type}">${move.type}</p>
                        </div>
                    </a>
                </div>
            `;
        });

        document.getElementById('moveList').innerHTML = view;
        document.getElementById('pagination').style.display = 'none';
    }

    async searchMoveByNameAndType() {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let selectedType = document.getElementById('typeSelect').value;
        selectedType = await this.typeFrencheToTypeEnglish(selectedType);
        let moves = await MovesProvider.getAllMoves();

        let filteredMoves = moves.filter(move => 
            move.ename.toLowerCase().includes(searchValue) &&
            (move.type === selectedType || selectedType === 'Tous les types')
        );
        let view = "";
        filteredMoves.forEach(move => {
            view += /*html*/ `
                <div class="col">
                    <a href="#/move/${move.id}" class="card shadow-sm text-decoration-none">
                        <div class="card-body">
                            <h4 class="card-title">${move.ename}</h4>
                            <p class="${move.type}">${move.type}</p>
                        </div>
                    </a>
                </div>
            `;
        });

        document.getElementById('moveList').innerHTML = view;
        document.getElementById('pagination').style.display = 'none';
    }

    renderPagination(totalItems) {
        let totalPages = Math.ceil(totalItems / this.itemsPerPage);
        let pages = '';
    
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - this.currentPage) <= 1) {
                pages += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#/moves" data-page="${i}">${i}</a></li>`;
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
                        <a class="page-link" href="#/moves" data-page="${this.currentPage - 1}" tabindex="-1" aria-disabled="true">Précédent</a>
                    </li>
                    ${pages}
                    <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#/moves" data-page="${this.currentPage + 1}">Suivant</a>
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

    async after_render() {
        let filterButton = document.getElementById('filterButton');
        if (filterButton) {
            filterButton.addEventListener('click', () => {
                let searchValue = document.getElementById('search').value;
                let selectedType = document.getElementById('typeSelect').value;

                if (searchValue && selectedType !== 'Tous les types') {
                    this.searchMoveByNameAndType();
                } else if (searchValue) {
                    this.searchMoveByName();
                } else if (selectedType !== 'Tous les types') {
                    this.searchMoveByType();
                }
            });
        }
    }
}
