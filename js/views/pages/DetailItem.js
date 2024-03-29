import ItemsProvider from "../../services/ItemsProvider.js";
import EquipeProvider from "../../services/EquipeProvider.js";

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
            <button class="addEquipe"> Ajouter au pokemon dans l'équipe </button>
                <select id="position">
                <option class=pos-1> 1 </option>
                <option class=pos-2> 2 </option>
                <option class=pos-3> 3 </option>
                <option class=pos-4> 4 </option>
                <option class=pos-5> 5 </option>
                <option class=pos-6> 6 </option>
                </select>
        `;
        return view;
    }
    async addPokemonToEquipe() {
        let position = document.getElementById('position').value;
        await EquipeProvider.fetchSwitchIteminEquipe(position, this.id);
    }
    async after_render() {
        document.querySelector('.addEquipe').addEventListener('click', async () => {
            await this.addPokemonToEquipe();
            window.location.href = '#/equipe';
        });
    }
}