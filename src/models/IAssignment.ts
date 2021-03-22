import { Moment } from 'moment';
import { IBase } from './IBase';

export interface IAssignment  extends IBase {
    data: IAssignmentData;
}

export interface IAssignmentData {
    createdAt: Moment | null;
    subjectId: number;
    subjectType: string;
    srsState: number;
    unlockedAt: Moment | null;
    startedAt: Moment | null;
    passedAt: Moment | null;
    burnedAt: Moment | null;
    availableAt: Moment | null;
    resurrectedAt: Moment | null;
}