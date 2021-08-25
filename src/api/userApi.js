import { api } from './api';

export const getUserData = () => {
	return api.get('me');
};
