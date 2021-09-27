import React from 'react';
import { Link } from 'react-router-dom';

import { routesConstants } from '../../constants';
import { useAuth } from '../../context/AuthContext';

import { ILoginState } from '../../types/login';

const Login: React.FC = () => {
	const { loading, login } = useAuth();

	const [state, setState] = React.useState<ILoginState>({
		email: '',
		password: '',
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login(state.email, state.password);
	};

	return (
		<form className='admin__form' onSubmit={handleSubmit}>
			<h2 className='text-center'>Log In</h2>
			<label className='admin__form-label'>
				Email
				<input
					className='admin__form-input'
					name='email'
					type='email'
					value={state.email}
					onChange={handleInputChange}
					required
				/>
			</label>
			<label className='admin__form-label'>
				Password
				<input
					className='admin__form-input'
					name='password'
					type='password'
					value={state.password}
					onChange={handleInputChange}
					required
				/>
			</label>
			<button type='submit' disabled={loading}>
				Login
			</button>
			{loading ? 'Loading' : ''}
			<p className='text-center'>
				Need an account? <Link to={routesConstants.signup}>Signup</Link>
			</p>
		</form>
	);
};

export default Login;
