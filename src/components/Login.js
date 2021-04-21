import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import LoginWithGoogle from './LoginWithGoogle';

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
			// localStorage.setItem('expiration', Date.now() + 360000);
			const user = {
				name: loginData.name,
				token: data.token
			}   
			setActiveUser(user);
			localStorage.setItem('userName', loginData.name);
			history.push('/');
		})
		.catch(() => setLoginError(true));
	};

	// useEffect(() => {
	// 	checkForSessionExpired();
	// }, [])

	// any time we make a request using a token,
	// compare Date.now() to localStorage.get('expiration')
	// function checkForSessionExpired() {
	// 	if (Date.now() > localStorage.getItem('expiration')) {
	// 		console.log('session expired');
	// 		history.push('/signin');
	// 	}
	// }

	return (
		<div className='center'>
			<h1>C L I Q U E</h1>
			<h2>Log In</h2>
			<form onSubmit={handleSubmit} className='login-form'>
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
				<button className='' id='button' type='submit'>
					Sign In
				</button>
			</form>
            {/* <LoginWithGoogle /> */}
			{loginError && <p>Username or password not found</p>}
			<p>No account yet?</p><Link to={'/signup'}>Create Account</Link>
		</div>
	);
};

export default Login;
