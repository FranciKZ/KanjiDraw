import { Moment } from "moment";
import { IBase } from "./IBase";

export interface IReview extends IBase {
    data: IReviewData;
}

export interface IReviewData { 
    createdAt: Moment;
    assignmentId: number;
    spacedRepetitionSystemId: number;
    startingSrsStage: number;
    subjectId: number;
    incorrectReadingAnswers: number;
    incorrectMeaningAnswers: number;
    endingSrsStage: number;
}