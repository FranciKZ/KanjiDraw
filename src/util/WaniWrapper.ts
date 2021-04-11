import { AppStorage } from './AppStorage';
class WaniWrapper {
    static baseUrl = 'https://api.wanikani.com/v2/';

    private static setHeaders = async () => {
        try {
            const key = await AppStorage.getSecureItem('waniKey');
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${key}`);

            return headers;
        } catch (e) {
            Promise.reject()
        }
    }
}