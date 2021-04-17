import { Moment } from "moment";
import { IBase } from "./IBase";

export interface ISubject extends IBase {
    data: ISubjectData;
}

export interface ISubjectData {
    auxiliaryMeanings: IAuxiliaryMeaning[];
    characters: string | null;
    createdAt: string;
    documentUrl: string;
    hiddenAt: string;
    lessonPosition: number;
    level: number;
    meaningMnemonic: string;
    meanings: IMeaning[];
    slug: string;
    spaceRepetitionSystemId: number;
    amalgamationSubjectIds?: number[];
    characterImages?: ICharacterImage[];
    componentSubjectIds?: number[];
    meaningHint?: string | null;
    readingHint?: string | null;
    readingMnemonic?: string;
    readings?: IKanjiReading[];
    visuallySimilarSubjectIds?: number[];
    contextSentences?: IContextSentence[];
    partsOfSpeech?: string[];
    pronunciationAudios?: IPronunciation[];
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

export interface ICharacterImage {
    url: string;
    metadata: ISvgCharacter | IPngCharacter;
    contentType: 'image/png' | 'image/svg+xml';
}

export interface ISvgCharacter {
    inlineStyles: boolean;
}

export interface IPngCharacter {
    color: string;
    dimensions: string;
    styleName: string;
}

export interface IKanjiReading {
    reading: string;
    primary: boolean;
    acceptedAnswer: boolean;
    type: 'kunyomi' | 'nanori' | 'onyomi';
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