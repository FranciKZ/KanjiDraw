import { IBulkResponse, ISubject } from "../../models";
import { sendRequest } from "./sharedApi";

export const getLevel = async (levelNumber: number): Promise<IBulkResponse<ISubject>> => {
    let result: IBulkResponse<ISubject> = {} as IBulkResponse<ISubject>;
    try {
        return await sendRequest<IBulkResponse<ISubject>>('GET', `subjects?levels=${levelNumber}`, 'Error fetching level data.');
    } catch (e) {
        Promise.reject('Error fetching level subjects');
    }

    return result;
}