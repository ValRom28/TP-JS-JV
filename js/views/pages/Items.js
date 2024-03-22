import ItemsProvider from "../../services/ItemsProvider.js";

export default class Items {

    async render () {
        let objects = await ItemsProvider.getItems();
        let view =  /*html*/`
            <h2>Tous les objets</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ objects.map(object => 
                    /*html*/`
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
        `
        return view
    }

}