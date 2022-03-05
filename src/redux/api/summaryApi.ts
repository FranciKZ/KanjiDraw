import { ISummaryResponse } from '../../models';
import { sendRequest } from './sharedApi';

export const getUserSummary = async (): Promise<ISummaryResponse> => {
  let result: ISummaryResponse = {} as ISummaryResponse;
  try {
      return await sendRequest<ISummaryResponse>('GET', `summary`, 'Error fetching level data.');
  } catch (e) {
      Promise.reject('Error fetching level subjects');
  }

  return result;
}
