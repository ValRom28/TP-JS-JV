import { ENDPOINT } from '../config.js'

export default class ItemsProvider {

    static async getItems() {
        try {
            const response = await fetch(ENDPOINT + '/items')
            return await response.json()
        } catch (error) {
            console.error('Error fetching objects', error);
            return [];
        }
    }
}