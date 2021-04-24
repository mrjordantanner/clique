import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../../config';

const CreateAccount = () => {

	const newUserState = {
		name: '',
		password: '',
		loggedIn: false
	};

	const history = useHistory();
	const [newUser, setNewUser] = useState(newUserState);
	const [signUpError, setSignUpError] = useState(false);

	const handleChange = (event) => {
		setNewUser({ ...newUser, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${APIurl}/users/create`, newUser)
			.then(() => {
				history.push(`/`);
			})
			.catch(() => setSignUpError(true));

		
	};

	return (
		<div className='center'>
			<div className='logo-text'>C L I Q U E</div>
			<h2>Create an account</h2>
			<form onSubmit={handleSubmit} className='account'>
				<input
					onChange={handleChange}
					name='name'
					value={newUser.name}
					placeholder='username'
				/>
				<input
					onChange={handleChange}
					type='password'
					name='password'
					value={newUser.password}
					placeholder='password'
				/>
				<button className='button' id='button' type='submit'>
					Sign Up
				</button>
			</form>
			<p>Already have an account?</p><Link to={'/'}>Log In Instead</Link>
			{signUpError && <p>User already exists</p>}
		</div>
	);
};

export default CreateAccount;