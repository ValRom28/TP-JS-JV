import { ENDPOINT } from '../config.js';

export default class EquipeProvider {
    static async fetchEquipe() {
        try {
            let response = await fetch(`${ENDPOINT}/equipe`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
    static async fetchSwitchPokemoninEquipe(id, idPokemon) {
        try {
            let membre = await this.fetchEquipeByID(id);
    
            membre.idPokemon = idPokemon;
    
            let response = await fetch(`${ENDPOINT}/equipe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(membre)
            });
    
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
    static async fetchEquipeByID(id) {
        try {
            const response = await fetch(`${ENDPOINT}/equipe/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
    static async fetchSwitchIteminEquipe(id, idObjet) {
        try {
            let membre = await this.fetchEquipeByID(id);
    
            membre.idObjet = idObjet;
    
            let response = await fetch(`${ENDPOINT}/equipe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(membre)
            });
    
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {}; // Retourne un objet vide en cas d'erreur
        }
    }
}