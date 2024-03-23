import ItemsProvider from "../../services/ItemsProvider.js";

export default class Items {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 18; // Nombre d'articles par page
    }

    async render() {
        let objects = await ItemsProvider.getItems();
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        let displayedObjects = objects.slice(startIndex, endIndex);

        let pagination = this.renderPagination(objects.length);

        let view = /*html*/ `
            <h2>Tous les objets</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ displayedObjects.map(object => 
                    /*html*/ `
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${object.name["english"]}</h5>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="#/article/${object.id}" class="btn btn-sm btn-outline-secondary">Voir</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                ).join('\n ')
                }
            </div>
            ${pagination}
        `;

        return view;
    }

    renderPagination(totalItems) {
        let totalPages = Math.ceil(totalItems / this.itemsPerPage);
        let pages = '';

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                pages += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
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
                        <a class="page-link" href="#" data-page="${this.currentPage - 1}" tabindex="-1" aria-disabled="true">Précédent</a>
                    </li>
                    ${pages}
                    <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#" data-page="${this.currentPage + 1}">Suivant</a>
                    </li>
                </ul>
            </nav>
        `;

        return pagination;
    }

    async bindEvents() {
        // Ajoutez le gestionnaire d'événements pour la pagination ici
        const self = this;
        document.querySelectorAll('.pagination a.page-link').forEach(link => {
            link.addEventListener('click', async function(event) {
                event.preventDefault();
                let pageNumber = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNumber)) {
                    self.currentPage = pageNumber;
                    await self.render();
                }
            });
        });
    }
}
