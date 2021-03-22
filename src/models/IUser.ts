import { Moment } from "moment";

export interface IUser {
    object: string;
    url: string;
    updatedAt: Moment;
    data: IUserData;
}

export interface IUserData {
    id: string;
    username: string;
    level: number;
    profileUrl: string;
    startedAt: Moment;
    currentVacationStartedAt: Moment | null;
    subscription: ISubscription;
    preferences: IUserPreferences;
}

export interface ISubscription {
    active: boolean;
    maxLevelGranted: number;
    periodEndsAt: Moment | null;
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