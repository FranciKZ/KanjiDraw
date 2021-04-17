import { Moment } from "moment";
import { IBulkResponse } from ".";

export interface ICachedData<T> {
    lastFetched: string;
    data: IBulkResponse<T>;
}