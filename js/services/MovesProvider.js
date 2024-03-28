import { ENDPOINT } from '../config.js';

export default class MovesProvider {
    static async getMoves() {
        const response = await fetch(`${ENDPOINT}/moves`);
        try {
            const attacks = await response.json();
            return attacks;
        } catch (error) {
            console.error('Error while fetching attacks', error);
            return [];
        }
    }

    static async getMove(id) {
        const response = await fetch(`${ENDPOINT}/moves/${id}`);
        try {
            const move = await response.json();
            return move;
        } catch (error) {
            console.error('Error while fetching move', error);
            return {};
        }
    }
}