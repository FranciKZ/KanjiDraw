import { Moment } from 'moment';
import { IBase } from './IBase';

export interface ILevelProgression extends IBase {
    data: ILevelProgressionData;
}

export interface ILevelProgressionData { 
    createdAt: Moment;
    completedAt: Moment | null;
    abandonedAt: Moment| null;
    level: number;
    passedAt: Moment | null;
    startedAt: Moment | null;
    unlockedAt: Moment | null;
}