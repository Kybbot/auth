import { authApi } from './api';

export const signUp = (body) => {
	return authApi.post('sign_up', body);
};

export const logIn = (email, password) => {
	return authApi.post(`login?email=${email}&password=${password}`);
};
