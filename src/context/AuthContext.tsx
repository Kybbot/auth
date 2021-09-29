import React from 'react';

import TokenProvider from '../api/token';
import { signupWithEmailAndPassword, loginWithEmailAndPassword } from '../api/authApi';

import { IAuthContext, AuthProviderProps, responseStatuses } from '../types/authContext';
import { ISignupState } from '../types/signup';

const AuthContext = React.createContext<IAuthContext>({
	token: '',
	isLoggedIn: false,
	loading: false,
	signup: (state: ISignupState) => {},
	login: (email: string, password: string) => {},
	logout: () => {},
});

export const useAuth = () => {
	return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const accessToken = TokenProvider.getAccessToken();
	const [token, setToken] = React.useState<string | null>(accessToken);
	const isLoggedIn = !!token;

	const [loading, setLoading] = React.useState<boolean>(false);

	const signupHandler = async (state: ISignupState) => {
		try {
			setLoading(true);

			const body = JSON.stringify(state);
			const response = await signupWithEmailAndPassword(body);

			setLoading(false);

			if (response.data.status !== responseStatuses.ok) {
				throw new Error(response.data.message);
			}

			alert(response.data.message);

			return responseStatuses.ok;
		} catch (error) {
			setLoading(false);

			alert(error);
			return responseStatuses.error;
		}
	};

	const loginHandler = async (email: string, password: string) => {
		setLoading(true);

		try {
			const response = await loginWithEmailAndPassword(email, password);

			setLoading(false);

			if (response.data.statusCode !== 200) {
				throw new Error(response.data.message);
			}

			TokenProvider.setTokens(response.data.body);
			setToken(response.data.body.access_token);
		} catch (error) {
			setLoading(false);

			alert(error);
		}
	};

	const logoutHandler = () => {
		TokenProvider.removeTokens();
		setToken(null);
	};

	const contextValue: IAuthContext = {
		token,
		isLoggedIn,
		loading,
		signup: signupHandler,
		login: loginHandler,
		logout: logoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
