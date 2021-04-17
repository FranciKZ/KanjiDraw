import { Moment } from 'moment';
import { IBase } from './IBase';

export interface ILevelProgression extends IBase {
    data: ILevelProgressionData;
}

export interface ILevelProgressionData { 
    createdAt: string;
    completedAt: string;
    abandonedAt: string;
    level: number;
    passedAt: string;
    startedAt: string;
    unlockedAt: string;
}