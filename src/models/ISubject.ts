import { Moment } from "moment";
import { IBase } from "./IBase";

export interface ISubjectWithRelations {
    subject: ISubject | undefined;
    components: ISubject[] | undefined;
    amalgamations: ISubject[] | undefined;
    visuallySimilar: ISubject[] | undefined;
}

export interface ISubject extends IBase {
    data: ISubjectData;
}
export interface ISubjectData {
    auxiliary_meanings: IAuxiliaryMeaning[];
    characters: string | null;
    created_at: string;
    document_url: string;
    hidden_at: string;
    lesson_position: number;
    level: number;
    meaning_mnemonic: string;
    meanings: IMeaning[];
    slug: string;
    spaced_repetition_system_id: number;
    amalgamation_subject_ids?: number[];
    character_images?: ICharacterImage[];
    component_subject_ids?: number[];
    meaning_hint?: string | null;
    reading_hint?: string | null;
    reading_mnemonic?: string;
    readings?: IKanjiReading[];
    visually_similar_subject_ids?: number[];
    context_sentences?: IContextSentence[];
    parts_of_speech?: string[];
    pronunciation_audios?: IPronunciation[];
}

export interface IMeaning {
    meaning: string;
    primary: boolean;
    acceptedAnswer: boolean;
}

export interface IAuxiliaryMeaning {
    meaning: string;
    type: 'whitelist' | 'blacklist';
}

export interface ICharacterImage {
    url: string;
    metadata: ISvgCharacter | IPngCharacter;
    content_type: 'image/png' | 'image/svg+xml';
}

export interface ISvgCharacter {
    inline_styles: boolean;
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