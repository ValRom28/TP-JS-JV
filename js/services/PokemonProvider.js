import { ENDPOINT } from '../config.js';

export default class PokemonProvider {
    static async fetchPokedex() {
        try {
            let response = await fetch(`${ENDPOINT}/pokedex`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
    static async fetchTypes() {
        try {
            const response = await fetch(`${ENDPOINT}/types`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
    static async fetchPokemonByID(id) {
        try {
            const response = await fetch(`${ENDPOINT}/pokedex/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
    static async fetchnoteByID(id) {
        try {
            const response = await fetch(`${ENDPOINT}/notes/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
    static async addNoteById(id, note) {
        try {
            const response = await fetch(`${ENDPOINT}/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notation: note })
            });
    
            return await response.json();
        } catch (err) {
            console.log('Error in addNoteById', err);
            throw err; // Renvoie l'erreur pour pouvoir la gérer plus tard
        }
    }
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
