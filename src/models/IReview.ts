import { Moment } from "moment";
import { IBase } from "./IBase";

export interface IReview extends IBase {
    data: IReviewData;
}

export interface IReviewData { 
    createdAt: string;
    assignmentId: number;
    spacedRepetitionSystemId: number;
    startingSrsStage: number;
    subjectId: number;
    incorrectReadingAnswers: number;
    incorrectMeaningAnswers: number;
    endingSrsStage: number;
}