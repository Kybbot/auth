import { authApi } from './api';

class TokenProvider {
	setTokens = (tokens) => {
		localStorage.setItem('auth', JSON.stringify(tokens));
	};

	getAccessToken = () => {
		const auth = JSON.parse(localStorage.getItem('auth')) || null;

		if (auth) return auth.access_token;

		return auth;
	};

	getRefreshToken = () => {
		const auth = JSON.parse(localStorage.getItem('auth')) || null;

		if (auth) return auth.refresh_token;

		return auth;
	};

	refreshToken = async () => {
		const refreshToken = this.getRefreshToken();

		const rs = await authApi.post(
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
