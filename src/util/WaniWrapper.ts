import AsyncStorage from '@react-native-async-storage/async-storage';
import { IBulkResponse } from '../models';
import { SecureStorage } from './SecureStorage';
class WaniWrapper {
    static baseUrl = 'https://api.wanikani.com/v2/';

    private static setHeaders = async () => {
        try {
            const key = await SecureStorage.getItem('waniKey');
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${key}`);

            return headers;
        } catch (e) {
            Promise.reject()
        }
    }
}