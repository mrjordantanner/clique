import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../../config';

const Login = ( { setActiveUser } ) => {
    
    const initialState = {
        name: '',
        password: ''
    }
	const history = useHistory();
	const [loginData, setLoginData] = useState(initialState);
	const [loginError, setLoginError] = useState(false);

	const handleChange = (event) => {
		setLoginData({ ...loginData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
		.post(`${APIurl}/users/login`, loginData)
		// Patch user data with token and loggedIn status
		.then(({ data }) => axios.patch(`${APIurl}/users/name/${loginData.name}`, {
			token: data.token,
			loggedIn: true,
		}))
		// Save userData for local use
		.then(({ data }) => {
			setActiveUser(data);
			localStorage.setItem('activeUserId', data._id);
		})
		// Push user to main view
		.then(history.push('/'))
		.catch(() => setLoginError(true));
	};

	return (
		<div className='home'>

		<div className='left'>
			<div className='logo-text'>CLIQUE</div>
			<div className='tagline'>The chat app that visualizes people and the spaces where they hangout in a new way.</div>
		</div>

		<div className='right'>
			<form onSubmit={handleSubmit} className='account'>
				<input
					onChange={handleChange}
					name='name'
					value={loginData.name}
					placeholder='username'
				/>
				<input
					onChange={handleChange}
					type='password'
					name='password'
					value={loginData.password}
					placeholder='password'
				/>
				<button className='button' id='button' type='submit'>
					Sign In
				</button>
			</form>
			{loginError && <div className='error'>Username or password not found</div>}
			<p>No account yet?</p><Link to={'/signup'}>Create Account</Link>
			</div>
		</div>
	);
};

export default Login;
