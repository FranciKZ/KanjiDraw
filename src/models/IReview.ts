import { IBase } from './IBase';

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
export interface IReview extends IBase {
  data: IReviewData;
}
