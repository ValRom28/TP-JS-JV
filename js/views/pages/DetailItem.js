import ItemsProvider from "../../services/ItemsProvider.js";

export default class DetailItem {
    constructor() {
        this.id = null;
    }

    async render() {
        let object = await ItemsProvider.getItemById(this.id);

        let view = /*html*/ `
            <h2>${object.name["english"]}</h2>
        `;
        return view;
    }
}