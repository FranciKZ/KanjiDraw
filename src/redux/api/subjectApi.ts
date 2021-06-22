import { ISubject, IBulkResponse, IAssignment, ISubjectWithRelations } from "../../models";
import { sendRequest } from "./sharedApi";

export async function getSubject(subjectId: number): Promise<ISubject> {
    return await sendRequest<ISubject>('GET', `subjects/${subjectId}`, 'Error fetching subjects');
}

export async function getAssignmentData(subjectId: number): Promise<IAssignment[]> {
    const data = await sendRequest<IBulkResponse<IAssignment>>('GET', `assignments?subject_ids=${subjectId}`, `Error fetching assignment data`);
    return data.data;
}

export async function getSubjects(subjectIds: number[]): Promise<IBulkResponse<ISubject>> {
    return await sendRequest<IBulkResponse<ISubject>>('GET', `subjects?ids=${subjectIds.join(',')}`, 'Error fetching subjects.');
}

export async function getAllSubjectData(subjectId: number): Promise<ISubjectWithRelations> {
    const subject = await getSubject(subjectId);
    // let assignments = await getAssignmentData(subject.id);
    // let reviewStatistics = undefined;
    let amalgamations = undefined;
    let components = undefined;
    let visuallySimilar = undefined;

    if (subject.object !== 'vocabulary') {
        const amalgamationsResponse = await getSubjects(subject.data.amalgamation_subject_ids!);

        if (subject.object === 'kanji') {
            const componentResponse = await getSubjects(subject.data.component_subject_ids!);
            const visuallySimilarResponse = await getSubjects(subject.data.visually_similar_subject_ids!);
            components = componentResponse.data;
            visuallySimilar = visuallySimilarResponse.data;
        }

        amalgamations = amalgamationsResponse.data;
    } else {
        const componentSubjectsResponse = await getSubjects(subject.data.component_subject_ids!);
        components = componentSubjectsResponse.data;
    }

    return { subject, amalgamations, components, visuallySimilar };
}