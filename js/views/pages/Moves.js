import MovesProvider from "../../services/MovesProvider.js";

export default class Moves {
    constructor() {
        this.moves = [];
        this.currentPage = 1;
        this.itemsPerPage = 24;
    }

    async render() {
        this.moves = await MovesProvider.getMoves();
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        let displayedMoves = this.moves.slice(startIndex, endIndex);
        
        let pagination = this.renderPagination(this.moves.length);
        
        return `
            <h2>Toutes les capacités</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                ${displayedMoves.map(move => 
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
            ${pagination}
        `;
    }

    renderPagination(totalItems) {
        let totalPages = Math.ceil(totalItems / this.itemsPerPage);
        let pages = '';

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
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
        // Nothing to do here
    }
}
