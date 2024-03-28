import MovesProvider from "../../services/MovesProvider.js";

export default class Moves {
    constructor() {
        this.moves = [];
    }

    async render() {
        this.moves = await MovesProvider.getMoves();
        return `
            <h1>Attacks</h1>
            <ul>
                ${this.moves.map(attack => `<li>${attack.ename}</li>`).join('')}
            </ul>
        `;
    }

    async after_render() {
        // Nothing to do here
    }
}