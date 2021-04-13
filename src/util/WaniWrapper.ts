import moment from 'moment';
import { ICachedData, ISummaryData, ISummaryResponse } from '../models';
import { AppStorage } from './AppStorage';
export class WaniWrapper {
    static baseUrl = 'https://api.wanikani.com/v2';

    static async getSummary(): Promise<ISummaryResponse | undefined> {
        try {
            const headers = await this.setHeaders();
            const response = await fetch(`${this.baseUrl}/summary`, {
                method: 'GET',
                headers
            });

            // 27bb8e68-d34e-4987-a470-c9c3b7a610f0 
            if (response.ok) {
                const json = await response.json();
                return this.mapToSummaryData(json);
            }
        } catch (e) {
            Promise.reject('Error fetching summary');
        }
    }

    private static async setHeaders() {
        try {
            const key = await AppStorage.getSecureItem('waniKey');
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${key}`);

            return headers;
        } catch (e) {
            Promise.reject()
        }
    }

    private static mapToSummaryData(response: any): ISummaryResponse {
        return {
            object: response.object,
            url: response.url,
            updatedAt: moment(response.data_updated_at),
            data: {
                nextReviewsAt: moment(response.data.next_reviews_at),
                lessons: response.data.lessons.map((val: any) => ({ 
                    availableAt: moment(val.available_at),
                    subjectIds: val.subject_ids
                })),
                reviews: response.data.reviews.map((val: any) => ({ 
                    availableAt: moment(val.available_at),
                    subjectIds: val.subject_ids
                }))
            }
        };
    }
}