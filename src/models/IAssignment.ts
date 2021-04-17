import { Moment } from 'moment';
import { IBase } from './IBase';

export interface IAssignment extends IBase {
    data: IAssignmentData;
}

export interface IAssignmentData {
    createdAt: string;
    subjectId: number;
    subjectType: string;
    srsState: number;
    unlockedAt: string;
    startedAt: string;
    passedAt: string;
    burnedAt: string;
    availableAt: string;
    resurrectedAt: string;
}