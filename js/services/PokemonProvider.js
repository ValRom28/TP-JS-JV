import { ENDPOINT } from '../config.js';

export default class PokemonProvider {
    static async fetchPokedex() {
        try {
            const response = await fetch(`${ENDPOINT}/pokedex`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
}
