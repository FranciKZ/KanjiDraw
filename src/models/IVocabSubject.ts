import { ISubjectBase } from "./ISubjectBase";

export interface IVocabSubject extends ISubjectBase {
    componentSubjectIds: number[];
    contextSentences: IContextSentence[];
    meaningMnemonic: string;
    partsOfSpeech: string[];
    pronunciationAudios: IPronunciation[];
}

export interface IContextSentence {
    en: string;
    ja: string;
}

export interface IVocabReading {
    acceptedAnswer: boolean;
    primary: boolean;
    reading: string;
}

export interface IPronunciation {
    url: string;
    contentType: 'audio/mpeg' | 'audio/ogg';
    metadata: IPronunciationMetadata;
}

export interface IPronunciationMetadata {
    gender: string;
    sourceId: number;
    pronunciation: string;
    voiceActorId: number;
    voiceActorName: string;
    voiceDescription: string;
}