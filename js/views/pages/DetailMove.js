import MovesProvider from "../../services/MovesProvider.js";

export default class DetailMove {
    constructor() {
        this.move = {};
    }

    async render() {
        let move = await MovesProvider.getMove(this.id);
        this.move = move;
        return `
            <h2>${this.move.ename}</h2>
            <p>Accuracy: ${this.move.accuracy}</p>
            <p>Power: ${this.move.power}</p>
            <p>PP: ${this.move.pp}</p>
        `;
    }

    async after_render() {
        // Nothing to do here
    }
}