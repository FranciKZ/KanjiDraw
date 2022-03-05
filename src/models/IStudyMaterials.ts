import { IBase } from './IBase';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
