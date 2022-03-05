import { IBulkResponse, ISubject } from '../../models';
import { sendRequest } from './sharedApi';

const getLevel = async (levelNumber: number): Promise<IBulkResponse<ISubject>> => {
  const result: IBulkResponse<ISubject> = {} as IBulkResponse<ISubject>;
  try {
    return await sendRequest<IBulkResponse<ISubject>>('GET', `subjects?levels=${levelNumber}`, 'Error fetching level data.');
  } catch (e) {
    Promise.reject(new Error('Error fetching level subjects'));
  }

  return result;
};

export default getLevel;
