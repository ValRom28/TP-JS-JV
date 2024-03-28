import { ENDPOINT } from '../config.js';

export default class ShinyProvider {
    static async fetchPokemonShiny(id) {
        try {
            const response = await fetch(`${ENDPOINT}/shiny/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
}