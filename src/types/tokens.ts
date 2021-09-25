export interface ITokens {
	access_token: string;
	refresh_token: string;
}

export type Tokens = ITokens | null;

export interface IRefreshTokenResponse {
	body: {
		access_token: string;
		refresh_token: string;
	};
	statusCode: number;
}
