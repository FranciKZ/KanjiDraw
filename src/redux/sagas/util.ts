import { ISubject, ISubjectWithRelations } from "../../models";

export const mapSubjectRelationsDataToStoreStructure = (subjectData: ISubjectWithRelations): Record<string, ISubject> => {
    const newSubjects: Record<string, ISubject> = {};
    newSubjects[subjectData.subject.id] = subjectData.subject;

    subjectData.amalgamations?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);
    subjectData.components?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);
    subjectData.visuallySimilar?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);

    return newSubjects;
}

export const mapSubjectDataToStoreStructure = (subjectData: ISubject[]): Record<string, ISubject> => {
    const newSubjects: Record<string, ISubject> = {};
    subjectData.forEach((val: ISubject) => newSubjects[val.id] = val);

    return newSubjects;
}

export const getNeededSubjectArray = (subjects: Record<string, ISubject>, subjectId: number): number[] => {
    const subject = subjects[subjectId];
    const result: number[] = [];

    subject.data.amalgamation_subject_ids?.forEach((val: number) => !subjects[val] && result.push(val));
    subject.data.component_subject_ids?.forEach((val: number) => !subjects[val] && result.push(val));
    subject.data.visually_similar_subject_ids?.forEach((val: number) => !subjects[val] && result.push(val));

    return result;
}
