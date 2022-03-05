import { ISummaryResponse } from '../../models';
import { sendRequest } from './sharedApi';

const getUserSummary = async (): Promise<ISummaryResponse> => {
  const result: ISummaryResponse = {} as ISummaryResponse;
  try {
    return await sendRequest<ISummaryResponse>('GET', 'summary', 'Error fetching level data.');
  } catch (e) {
    Promise.reject(new Error('Error fetching level subjects'));
  }

  return result;
};

export default getUserSummary;
