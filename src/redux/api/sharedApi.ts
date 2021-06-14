import { AppStorage } from "../../util/AppStorage";
const baseUrl = 'https://api.wanikani.com/v2';

export async function sendRequest<T>(method: string, queryString: string, error: string): Promise<T> {
    let result: T = {} as T;

    try {
        const headers = await setHeaders(method);
        const response = await fetch (`${baseUrl}/${queryString}`, { headers });

        if (response.ok) {
            result = await response.json();
        }
    } catch (e) {
        Promise.reject(error);
    }

    return result;
}

export async function setHeaders(method: string) {
    try {
        const key = await AppStorage.getSecureItem('waniKey');
        let headers = new Headers();
        headers.append('Method', method);
        headers.append('Authorization', `Bearer ${key}`);
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', '*/*');
        headers.append('Connection', 'keep-alive');

        return headers;
    } catch (e) {
        Promise.reject()
    }
}
