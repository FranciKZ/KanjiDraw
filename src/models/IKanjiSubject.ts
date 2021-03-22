import { ISubjectBase } from "./ISubjectBase";

export interface IKanjiSubject extends ISubjectBase {
    amalgamationSubjectIds: number[];
    componentSubjectIds: number[];
    meaningHint: string | null;
    readingHint: string | null;
    readingMnemonic: string;
    readings: IKanjiReading[];
    visuallySimilarSubjectIds: number[];
}

export interface IKanjiReading {
    reading: string;
    primary: boolean;
    acceptedAnswer: boolean;
    type: 'kunyomi' | 'nanori' | 'onyomi';
}