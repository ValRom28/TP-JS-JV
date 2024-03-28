import ItemsProvider from "../../services/ItemsProvider.js";

export default class Items {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
    }

    async render() {
        let objects = await ItemsProvider.getItems(this.currentPage, this.itemsPerPage);
        let pagination = this.renderPagination(objects.items);

        let view = /*html*/ `
            <h2>Tous les objets</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                ${objects.data.map(object => 
                    /*html*/ `
                    <div class="col">
                        <a href="#/item/${object.id}" class="card shadow-sm text-decoration-none">
                            <img src="${object.img}" class="card-img-top" alt="${object.name["french"]}">
                            <div class="card-body">
                                <h5 class="card-title">${object.name["french"]}</h5>
                            </div>
                        </a>
                    </div>`
                ).join('\n')}
            </div>
            ${pagination}
        `;

        return view;
    }

    renderPagination(totalItems) {
        let totalPages = Math.ceil(totalItems / this.itemsPerPage);
        let pages = '';

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                pages += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#/items" data-page="${i}">${i}</a></li>`;
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
                        <a class="page-link" href="#/items" data-page="${this.currentPage - 1}" tabindex="-1" aria-disabled="true">Précédent</a>
                    </li>
                    ${pages}
                    <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#/items" data-page="${this.currentPage + 1}">Suivant</a>
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
    }
}
