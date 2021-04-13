import { Moment } from "moment";

export interface ICachedData {
    lastFetched: Moment;
    data: any;
}