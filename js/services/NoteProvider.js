import { ENDPOINT } from '../config.js';

export default class NoteProvider {
    static async fetchNoteByID(id) {
        try {
            const response = await fetch(`${ENDPOINT}/notes/${id}`);
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
            return {};
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
            throw err;
        }
    }
}