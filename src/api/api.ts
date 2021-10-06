import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

// Request interceptor

const handleSuccessRequest = (config: AxiosRequestConfig) => {
	const token = TokenProvider.getAccessToken();

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

const handleErrorRequest = (error: any) => {
	return Promise.reject(error);
};

api.interceptors.request.use(handleSuccessRequest, handleErrorRequest);

// Response interceptor

const handleSuccessResponse = async (response: AxiosResponse) => {
	const originalRequest = response.config;

	if (response.data.statusCode === 401) {
		try {
			const accessToken = await TokenProvider.refreshToken();

			if (!accessToken) {
				throw new Error('Refresh token error! Update page.');
			}

			originalRequest.headers.Authorization = `Bearer ${accessToken}`;

			return api(originalRequest);
		} catch (err) {
			TokenProvider.removeTokens();
			window.location.reload();
			return Promise.reject(err);
		}
	}

	return response;
};

const handleErrorResponse = async (error: any): Promise<any> => {
	const originalRequest = error.config;

	if (error.response.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;

		try {
			const accessToken = await TokenProvider.refreshToken();

			originalRequest.headers.Authorization = accessToken;

			return api(originalRequest);
		} catch (_) {
			TokenProvider.removeTokens();
			return Promise.reject(error);
		}
	}

	return Promise.reject(error);
};

api.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
