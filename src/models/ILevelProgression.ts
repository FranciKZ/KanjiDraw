import { IBase } from './IBase';

export interface ILevelProgressionData {
  createdAt: string;
  completedAt: string;
  abandonedAt: string;
  level: number;
  passedAt: string;
  startedAt: string;
  unlockedAt: string;
}

export interface ILevelProgression extends IBase {
  data: ILevelProgressionData;
}
