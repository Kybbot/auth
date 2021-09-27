import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { routesConstants } from '../../constants';
import { useAuth } from '../../context/AuthContext';

import { responseStatuses } from '../../types/authContext';
import { ISignupState } from '../../types/signup';

const Signup: React.FC = () => {
	const { loading, signup } = useAuth();

	const history = useHistory();

	const [state, setState] = React.useState<ISignupState>({
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const status = await signup(state)!;

		if (status === responseStatuses.ok) {
			history.push(routesConstants.login);
		}
	};

	return (
		<form className='admin__form' onSubmit={handleSubmit}>
			<h2 className='text-center'>Sign Up</h2>
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
				Signup
			</button>
			{loading ? 'Loading' : ''}
			<p className='text-center'>
				Already have an account? <Link to={routesConstants.login}>Login</Link>
			</p>
		</form>
	);
};

export default Signup;
