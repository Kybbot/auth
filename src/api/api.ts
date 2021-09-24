import axios from 'axios';
import TokenProvider from './token';

export const authApi = axios.create({
	baseURL: 'http://142.93.134.108:1111/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const api = axios.create({
	baseURL: 'http://142.93.134.108:1111/',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = TokenProvider.getAccessToken();

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	async (response) => {
		const originalRequest = response.config;

		if (response.data.statusCode === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const accessToken = await TokenProvider.refreshToken();

				originalRequest.headers.Authorization = accessToken;

				return api(originalRequest);
			} catch (err) {
				TokenProvider.setTokens(null);
				return Promise.reject(err);
			}
		}

		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const accessToken = await TokenProvider.refreshToken();

				originalRequest.headers.Authorization = accessToken;

				return api(originalRequest);
			} catch (err) {
				TokenProvider.setTokens(null);
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);
