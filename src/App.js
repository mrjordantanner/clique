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
		loggedIn: false,
		channel: null,
		xp: 0,
		widgets: []
	};

	const [messages, setMessages] = useState([]); 
    const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState({});
	const [currentChannel, setCurrentChannel] = useState(null);
	const [general, setGeneral] = useState(true);

	useEffect(() => {
		// rejoinChannel();
		loadUserData();
	}, []);

	// Reloads userData from localStorage if user reloads browser, closed and reopened it, etc.
	function loadUserData() {
		const activeUserId = localStorage.getItem('activeUserId');
		if (activeUserId) {
			axios
			.get(`${APIurl}/users/${activeUserId}`)
			.then((user) => {
				if (user) {
					setActiveUser(user);
					console.log(`Username: ${user.name}`);
					console.log(`XP: ${user.xp}`);
					console.log(`Token: ${user.token}`);
					console.log(`Channel: ${user.channel?._id}`);
					console.log(`Widgets: ${user.widgets?.length}`);
				}
			})
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
	function getUsers() {
		axios
		.get(`${APIurl}/users/loggedIn`)
		.then((users) => setUsers(users))
		.catch((err) => console.error(err));
	
		console.log(`Got Users: ${users.length}`);
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








	function addClick() {
		//clicks++;
		console.log('click');
		// localStorage.setItem('clicks', clicks);
	}

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
								<SideBar currentChannel={currentChannel} leaveChannel={leaveChannel} />
							</aside>

							<article className=''>
								<MainView 
									joinChannel={joinChannel} 
									leaveChannel={leaveChannel}
									activeUser={activeUser}
									currentChannel={currentChannel}
									addClick={addClick}
								/>
							</article>

							<aside className='sidebar-right'>
								<Chat 
									currentChannel={currentChannel}
									messages={messages} 
									setMessages={setMessages}
									general={general}
									setGeneral={setGeneral}
									activeUser={activeUser}
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