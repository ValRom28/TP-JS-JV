import { ENDPOINT } from '../config.js';

export default class ItemsProvider {
    static async getItems(page = 1, perPage = 18) {
        try {
            const response = await fetch(`${ENDPOINT}/items?_page=${page}&_per_page=${perPage}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching objects', error);
            return [];
        }
    }

    static async getItemById(id) {
        try {
            const response = await fetch(`${ENDPOINT}/items/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching object', error);
            return null;
        }
    }
    static async fetchItemByID(id) {
        try {
            const response = await fetch(`${ENDPOINT}/items/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
}
