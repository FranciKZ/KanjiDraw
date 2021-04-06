import AsyncStorage from '@react-native-async-storage/async-storage';
import { IBulkResponse } from '../models';

class WaniWrapper {
    static baseUrl = 'https://api.wanikani.com/v2/';

    static storeKey = async (key: string): Promise<boolean> => {
        try {
            await AsyncStorage.setItem('waniKey', key);
            return true;
        } catch (e) {
            return false;
        }
    }

    private static setHeaders = async () => {

        try {
            let headers = new Headers();
            // headers.append('Authorization', `Bearer ${key}`);

            return headers;
        } catch (e) {
            Promise.reject()
        }
    }
}