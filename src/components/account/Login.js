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
		.then(({ data }) => {
			localStorage.setItem('token', data.token);
			const userData = {
				name: loginData.name,
				token: data.token
			}   
			setActiveUser(userData);
			localStorage.setItem('userName', loginData.name);
			history.push('/');
		})
		// Mark user as logged in
		.then(axios.patch(`${APIurl}/users/login/${loginData.name}`)) 
		.catch(() => setLoginError(true));
	};

	return (
		<div className='home'>
			<h1 className='logo-text'>C L I Q U E</h1>
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
	);
};

export default Login;
