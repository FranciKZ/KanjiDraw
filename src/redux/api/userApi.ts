import { IUser } from '../../models';
import { sendRequest } from './sharedApi';

const getUserInfo = async (): Promise<IUser> => {
  const result: IUser = {} as IUser;

  try {
    return await sendRequest<IUser>('GET', 'user', 'Error fetching assignment level data');
  } catch (e) {
    Promise.reject(new Error('Error fetching level assignments'));
  }

  return result;
};

export default getUserInfo;
