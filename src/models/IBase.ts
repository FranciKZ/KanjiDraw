import { Moment } from "moment";

export interface IBase {
    id: number;
    object: string;
    url: string;
    updatedAt: Moment;
}