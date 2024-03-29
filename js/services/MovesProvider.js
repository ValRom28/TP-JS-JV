import { ENDPOINT } from '../config.js';

export default class MovesProvider {
    static async getMoves(page, perPage) {
        const response = await fetch(`${ENDPOINT}/moves?_page=${page}&_per_page=${perPage}`);
        try {
            const attacks = await response.json();
            return attacks;
        } catch (error) {
            console.error('Error while fetching attacks', error);
            return [];
        }
    }

    static async getAllMoves() {
        const response = await fetch(`${ENDPOINT}/moves`);
        try {
            const moves = await response.json();
            return moves;
        } catch (error) {
            console.error('Error while fetching moves', error);
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