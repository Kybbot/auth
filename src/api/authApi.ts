import { authApi } from './api';

import { ILoginResponse } from '../types/login';
import { ISignupResponse } from '../types/signup';

export const signupWithEmailAndPassword = (body: string) => {
	return authApi.post<ISignupResponse>('sign_up', body);
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
	return authApi.post<ILoginResponse>(`login?email=${email}&password=${password}`);
};
