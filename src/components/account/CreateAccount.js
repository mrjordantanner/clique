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
		<div className='home'>

			<div className='left'>
				<div className='header-text'>Create an account</div>
			</div>

			<div className='right'>
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
				{signUpError && <div className='error'>Sign Up Error! Please try again.</div>}
			</div>
		</div>
	);
};

export default CreateAccount;