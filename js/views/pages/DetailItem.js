import ItemsProvider from "../../services/ItemsProvider.js";

export default class DetailItem {
    constructor() {
        this.id = null;
    }

    async render() {
        let object = await ItemsProvider.getItemById(this.id);

        let view = /*html*/ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1>${object.name["french"]}</h1>
                        <img src="${object.img}" alt="${object.name["french"]}" class="img-fluid">
                        <p>Prix : ${object.cost}₽</p>
                    </div>
                </div>
            </div>
        `;
        return view;
    }
}