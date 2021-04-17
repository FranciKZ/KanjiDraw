import { Moment } from "moment";
import { IBase } from "./IBase";

export interface IStudyMaterials extends IBase {

}

export interface IStudyMaterialsData {
    createdAt: string;
    hidden: boolean;
    meaningNote: string | null;
    meaningSynonyms: string[];
    readingNote: string | null;
    subjectId: number;
    subjectType: string;
}