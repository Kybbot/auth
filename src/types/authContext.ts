import { ISignupState } from './signup';

export interface IAuthContext {
	token: string | null;
	isLoggedIn: boolean;
	loading: boolean;
	signup: (state: ISignupState) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
}

export type AuthProviderProps = {
	children: JSX.Element;
};

export const responseStatuses = {
	ok: 'Ok',
	error: 'error',
};
