export interface ILoginState {
	email: string;
	password: string;
}

export interface ILoginResponse {
	body: {
		access_token: string;
		refresh_token: string;
	};
	statusCode: number;
	message: string;
}
