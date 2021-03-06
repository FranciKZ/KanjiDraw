import moment from 'moment';
import { IAssignment, IBulkResponse, ICachedData, ISubject, ISubjectWithRelations, ISummaryResponse } from '../models';
import { AppStorage } from './AppStorage';
export class WaniWrapper {
    static baseUrl = 'https://api.wanikani.com/v2';

    static async getSummary(): Promise<ISummaryResponse | undefined> {
        try {
            const headers = await this.setHeaders('GET');
            const response = await fetch(`${this.baseUrl}/summary`, { headers } );

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            Promise.reject('Error fetching summary');
        }
    }

    static async getLevel(levelNumber: number): Promise<IBulkResponse<ISubject>> {
        let result: IBulkResponse<ISubject> = {} as IBulkResponse<ISubject>;
        try {
            const cachedLevelData: string | null = await AppStorage.getItem(`level-${levelNumber}`);
            let getData = !!!cachedLevelData;

            if (cachedLevelData) {
                let parsed: ICachedData<ISubject> = JSON.parse(cachedLevelData)
                result = parsed.data;
                getData = moment(parsed.lastFetched).isBefore(moment().subtract(60, 'days'));
            } 

            if (getData) {
                const headers = await this.setHeaders('GET');
                const response = await fetch(`${this.baseUrl}/subjects?levels=${levelNumber}`, { headers });

                if (response.ok) {
                    result = await response.json();

                    await AppStorage.setItem(`level-${levelNumber}`, JSON.stringify({ lastFetched: moment(), data: result }));
                }
            }
        } catch (e) {
            Promise.reject('Error fetching level subjects');
        }

        return result;
    }

    static async getSubject(subjectId: number): Promise<ISubject> {
        return await this.sendRequest<ISubject>('GET', `subjects/${subjectId}`, 'Error fetching subjects');
    }

    static async getAssignmentData(subjectId: number): Promise<IAssignment[]> {
        const data = await this.sendRequest<IBulkResponse<IAssignment>>('GET', `assignments?subject_ids=${subjectId}`, `Error fetching assignment data`);
        return data.data;
    }

    static async getSubjects(subjectIds: number[]): Promise<IBulkResponse<ISubject>> {
        return await this.sendRequest<IBulkResponse<ISubject>>('GET', `subjects?ids=${subjectIds.join(',')}`, 'Error fetching subjects.');
    }

    static async getAllSubjectData(subjectId: number): Promise<ISubjectWithRelations> {
        const subject = await this.getSubject(subjectId);
        let assignments = await this.getAssignmentData(subject.id);
        let reviewStatistics = undefined;
        let amalgamations = undefined;
        let components = undefined;
        let visuallySimilar = undefined;

        if (subject.object !== 'vocabulary') {
            const amalgamationsResponse = await this.getSubjects(subject.data.amalgamation_subject_ids!);

            if (subject.object === 'kanji') {
                const componentResponse = await this.getSubjects(subject.data.component_subject_ids!);
                const visuallySimilarResponse = await this.getSubjects(subject.data.visually_similar_subject_ids!);
                components = componentResponse.data;
                visuallySimilar = visuallySimilarResponse.data;
            }

            amalgamations = amalgamationsResponse.data;
        } else {
            const componentSubjectsResponse = await this.getSubjects(subject.data.component_subject_ids!);
            components = componentSubjectsResponse.data;
        }

        return { subject, amalgamations, components, visuallySimilar };
    }

    private static async sendRequest<T>(method: string, queryString: string, error: string): Promise<T> {
        let result: T = {} as T;

        try {
            const headers = await this.setHeaders(method);
            const response = await fetch (`${this.baseUrl}/${queryString}`, { headers });

            if (response.ok) {
                result = await response.json();
            }
        } catch (e) {
            Promise.reject(error);
        }

        return result;
    }

    private static async setHeaders(method: string) {
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
}