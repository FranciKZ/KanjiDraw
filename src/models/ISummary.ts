import { Moment } from "moment";

export interface ISummaryResponse {
    object: string;
    url: string;
    updatedAt: Moment;
    data: ISummary;
}

export interface ISummary {
    nextReviewsAt: Moment | null;
    lessons: ISummaryData[];
    reviews: ISummaryData[];
}

export interface ISummaryData {
    availableAt: Moment;
    subjectIds: number[];
}