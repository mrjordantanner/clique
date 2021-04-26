// Clique v0.1
// by Jordan T. Smith / @jtscodes
// General Assembly SEIR-201 Final Project
// April 26, 2021

import './styles/styles.scss';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketClient from "socket.io-client";
import APIurl from './config';
import axios from 'axios';

import MainView from './components/channel/MainView';
import SideBar from './components/SideBar';
import Chat from './components/chat/Chat';
import Navbar from './components/Navbar';
import Login from './components/account/Login';
import CreateAccount from './components/account/CreateAccount';

//region [Violet]
function App() {

	const blankUser = {
		name: null,
		token: null,
		channel: null,
	};

	const [messages, setMessages] = useState([]); 
	// const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState({});
	const [currentChannel, setCurrentChannel] = useState(null);
	const [general, setGeneral] = useState(true);

	// let currentChannel = null;
	// function setCurrentChannel(channel) {
	// 	currentChannel = Object.assign({}, channel);
	// 	console.log(`CurrentChannel_id: ${currentChannel._id}`)
	// }

	useEffect(() => {
		// rejoinChannel();
		loadUserData();
	}, []);

	function loadUserData() {
		// users = getUsers();
		const userName = localStorage.getItem('userName');
		const userToken = localStorage.getItem('token');
		const user = {
			name: userName,
			token: userToken,
			channel: currentChannel,
		};
		if (user) {
			setActiveUser(user);
		}
	}

	function handleLogout() {
		axios
		.patch(`${APIurl}/users/logout/${activeUser.name}`) 
		.catch((err) => console.error(err));
		localStorage.clear();
		setActiveUser(blankUser);
	}

	// Get all users that are logged in
	async function getUsers() {
		const response = await fetch(`${APIurl}/users/loggedIn`);
		const users = await response.json();
		console.log(`Got Users: ${users.length}`);
		return users;
	}

	function rejoinChannel() {
		// if (!currentChannel) {
		// 	const channel = localStorage.getItem('channel');
		// 	if (channel) {
		// 		joinChannel(channel);
		// 	}
		// }
	}

	function leaveChannel() {
		if (currentChannel) {
			localStorage.setItem('channel', null);
			// socket.emit('channel-leave', currentChannel);
			console.log(`Left channel: ${currentChannel.name}`)
			setCurrentChannel(null);
			setGeneral(true);
		}
		else{
			console.log(`Not currently in a channel.`);
		}
	}

	function joinChannel(channel) {

		if (currentChannel) {
			leaveChannel();
		}

		if (channel) {
			setCurrentChannel(channel);
			setGeneral(false);
			localStorage.setItem('channel', channel);
			// socket.emit('channel-join', channel);
		}
		else {
			console.log('Cant join channel - Not found');
		}
	};

	return (
		<div>
			<Switch>
				<Route exact path='/'>
					{activeUser.name ? (

						<div className='grid'>
							<header className='wireframe'>
								<Navbar handleLogout={handleLogout} activeUser={activeUser} />
							</header>

							<aside className='sidebar-left wireframe'>
								<SideBar />
							</aside>

							<article className=''>
								<MainView 
									joinChannel={joinChannel} 
									leaveChannel={leaveChannel}
									activeUser={activeUser}
									currentChannel={currentChannel}
								/>
							</article>

							<aside className='sidebar-right'>
								<Chat 
									currentChannel={currentChannel}
									messages={messages} 
									setMessages={setMessages}
									general={general}
									setGeneral={setGeneral}
								/>
							</aside>
						</div>
					) : (
						<Login setActiveUser={setActiveUser} />
					)}
				</Route>

				<Route exact path='/signup'>
					<CreateAccount />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
//endregion