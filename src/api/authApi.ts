import { authApi } from './api';

import { ILoginResponse } from '../types/login';
import { ISignupResponse } from '../types/signup';

export const signup = (body: string) => {
	return authApi.post<ISignupResponse>('sign_up', body);
};

export const login = (email: string, password: string) => {
	return authApi.post<ILoginResponse>(`login?email=${email}&password=${password}`);
};
