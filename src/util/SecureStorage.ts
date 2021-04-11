import * as SecureStore from 'expo-secure-store';

export class SecureStorage {
    static async getItem(key: string): Promise<string> {
        let item = await SecureStore.getItemAsync(key);
        
        if (item) {
            return item;
        } else {
            return '';
        }
    }

    static async setItem(key: string, data: any): Promise<void> {
        const store = typeof data !== 'string' ? JSON.stringify(data) : data;
        await SecureStore.setItemAsync(key, store);
    }
}
