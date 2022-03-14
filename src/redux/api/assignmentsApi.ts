import { sendRequest } from './sharedApi';
import { IBulkResponse, IAssignment } from '../../models';

export const getAssignmentsForLevel = async (
  levelNumber: number,
): Promise<IBulkResponse<IAssignment>> => {
  const result: IBulkResponse<IAssignment> = {} as IBulkResponse<IAssignment>;
  try {
    return await sendRequest<IBulkResponse<IAssignment>>('GET', `assignments?levels=${levelNumber}`, 'Error fetching assignment level data');
  } catch (e) {
    Promise.reject(new Error('Error fetching level assignments'));
  }
  return result;
};

export const getAssignmentForSubject = async (
  subjectId: number,
): Promise<IBulkResponse<IAssignment>> => {
  const result: IBulkResponse<IAssignment> = {} as IBulkResponse<IAssignment>;
  try {
    return await sendRequest<IBulkResponse<IAssignment>>('GET', `assignments?subject_ids=${subjectId}`, 'Error fetching assignment level data');
  } catch (e) {
    Promise.reject(new Error('Error fetching level assignments'));
  }
  return result;
};
