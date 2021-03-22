import { ISubjectBase } from './ISubjectBase';

export interface IRadicalSubject extends ISubjectBase {
    amalgamationSubjectIds: number[];
    characterImages: ICharacterImage[];
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