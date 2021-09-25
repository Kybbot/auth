import { authApi } from './api';

import { ITokens, Tokens, IRefreshTokenResponse } from '../types/tokens';

class TokenProvider {
	setTokens = (tokens: ITokens) => {
		localStorage.setItem('auth', JSON.stringify(tokens));
	};

	removeTokens = () => {
		localStorage.removeItem('auth');
	};

	getAccessToken = () => {
		const authTokens = localStorage.getItem('auth') || null;
		const auth: Tokens = authTokens !== null ? JSON.parse(authTokens) : null;

		if (auth) return auth.access_token;

		return auth;
	};

	getRefreshToken = () => {
		const authTokens = localStorage.getItem('auth') || null;
		const auth: Tokens = authTokens !== null ? JSON.parse(authTokens) : null;

		if (auth) return auth.refresh_token;

		return auth;
	};

	refreshToken = async () => {
		const refreshToken = this.getRefreshToken();

		const rs = await authApi.post<IRefreshTokenResponse>(
			'refresh',
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			}
		);

		const tokens = rs.data.body;
		const accessToken = rs.data.body.access_token;
		this.setTokens(tokens);

		return accessToken;
	};
}

export default new TokenProvider();
