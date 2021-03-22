import { Moment } from "moment";
import { IBase } from "./IBase";

export interface ISubjectBase extends IBase {
    auxiliaryMeanings: IAuxiliaryMeaning[];
    characters: string | null;
    createdAt: Moment;
    documentUrl: string;
    hiddenAt: Moment | null;
    lessonPosition: number;
    level: number;
    meaningMnemonic: string;
    meanings: IMeaning[];
    slug: string;
    spaceRepetitionSystemId: number;
}

export interface IAuxiliaryMeaning {
    meaning: string;
    primary: boolean;
    acceptedAnswer: boolean;
}

export interface IMeaning {
    meaning: string;
    type: 'whitelist' | 'blacklist';
}