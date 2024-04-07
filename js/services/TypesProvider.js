import { ENDPOINT } from '../config.js';

export default class TypesProvider {
    static async fetchTypes() {
        try {
            const response = await fetch(`${ENDPOINT}/types`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
}