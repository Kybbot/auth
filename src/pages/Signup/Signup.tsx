import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { routesConstants } from '../../constants';
import { signup } from '../../api/authApi';

import { ISignupState } from '../../types/signup';

const Signup: React.FC = () => {
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

	const history = useHistory();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const body = JSON.stringify(state);
			const result = await signup(body);

			if (result.status === 200) {
				history.push(routesConstants.login);
			}
		} catch (error) {
			console.log(error);
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
			<button type='submit'>Sign Up</button>
			<p className='text-center'>
				Already have an account? <Link to={routesConstants.login}>Log in</Link>
			</p>
		</form>
	);
};

export default Signup;
