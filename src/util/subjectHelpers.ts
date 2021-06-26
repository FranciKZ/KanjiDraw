import { ISubject } from "../models";

export const subjectsAreGood = (subjectState: Record<string, ISubject>, subjectId: number) => {
    const subject = subjectState[subjectId];
    const componentsGood = subject && subject.data.component_subject_ids ? subject.data.component_subject_ids.every((val: number) => !!subjectState[val]) : true;
    const amalgamationsGood = subject && subject.data.amalgamation_subject_ids ? subject.data.amalgamation_subject_ids.every((val: number) => !!subjectState[val]) : true;
    const visualGood = subject && subject.data.visually_similar_subject_ids ? subject.data.visually_similar_subject_ids.every((val: number) => !!subjectState[val]) : true;

    return !!subject && componentsGood && amalgamationsGood && visualGood;
}