import { Moment } from "moment";

export interface IUser {
    object: string;
    url: string;
    updatedAt: string;
    data: IUserData;
}

export interface IUserData {
    id: string;
    username: string;
    level: number;
    profileUrl: string;
    startedAt: string;
    currentVacationStartedAt: string;
    subscription: ISubscription;
    preferences: IUserPreferences;
}

export interface ISubscription {
    active: boolean;
    maxLevelGranted: number;
    periodEndsAt: string;
    type: string;
}

export interface IUserPreferences {
    defaultVoiceActorId: number;
    lessonsAutoplayAudio: boolean;
    lessonsBatchSize: number;
    lessonsPresentationOrder: string;
    reviewsAutoplayAudio: boolean;
    reviewsDisplaySrsIndicator: boolean;
}