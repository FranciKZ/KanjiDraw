import { IBulkResponse, IStatistics } from '../../models';
import { sendRequest } from './sharedApi';

const getStatisticsForSubject = async (subjectId: number): Promise<IBulkResponse<IStatistics>> => {
  let result: IBulkResponse<IStatistics> = {} as IBulkResponse<IStatistics>;
  try {
    result = await sendRequest<IBulkResponse<IStatistics>>('GET', `review_statistics?subject_ids=${subjectId}&hidden=false`, 'Error fetching statistics for subject');
  } catch (e) {
    Promise.reject(new Error('Error fetching statistics for subject'));
  }
  return result;
};

export default getStatisticsForSubject;
