import { Moment } from 'moment';
import { IAssignment } from './IAssignment';
import { ILevelProgression } from './ILevelProgression';
import { IReview } from './IReview';
import { IStudyMaterials } from './IStudyMaterials';

export interface IBulkResponse {
    object: string;
    url: string;
    pages: IPages;
    totalCount: number;
    updatedAt: Moment;
    data: IAssignment[] | IReview[] | ILevelProgression[] | IStudyMaterials[];
}

export interface IPages {
    perPage: number;
    nextUrl: string | null;
    previousUrl: string | null;
}