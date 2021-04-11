import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AppStorage {
    static async getSecureItem(key: string): Promise<string> {
        let item = await SecureStore.getItemAsync(key);
        
        if (item) {
            return item;
        } else {
            return '';
        }
    }

    static async setSecureItem(key: string, data: any): Promise<void> {
        const store = typeof data !== 'string' ? JSON.stringify(data) : data;
        await SecureStore.setItemAsync(key, store);
    }

    static async getItem(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }

    static async setItem(key: string, data: any): Promise<void> {
        const store = typeof data !== 'string' ? JSON.stringify(data) : data;

        await AsyncStorage.setItem(key, store);
    }
}
