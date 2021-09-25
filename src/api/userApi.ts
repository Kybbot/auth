import { api } from './api';

import { IUserData } from '../types/userData';

export const getUserData = () => {
	return api.get<IUserData>('me');
};
