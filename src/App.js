
import './styles/styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketClient from "socket.io-client";
import APIurl from './config';
import axios from 'axios';

import MainView from './components/channel/MainView';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Login from './components/account/Login';
import CreateAccount from './components/account/CreateAccount';

//region [Violet]
function App() {

	// function getChannelById(id) {
	// 	return channels.find(channel => channel._id === id)
	// }

	const blankUser = {
		name: null,
		token: null,
		channel: null,
	};

	// const [channel, setChannel] = useState({});	
	// const [channels, setChannels] = useState([]);
	// const [targetChannel, setTargetChannel] = useState({});
	const [activeUser, setActiveUser] = useState({});

	useEffect(() => {
		// init();
		loadUserData();
		// joinLastChannel();
		printReport();
	}, []);

	// const general = getGeneral();
	// const channels = getChannels();
	// const users = getUsers();
	// changeTargetChannel(general);

	const socket = socketClient(APIurl);
	configureSocket();

	function printReport() {
		// console.clear();

		// console.log(`------`);
		// console.log(`General Channel: ${general.name}, ${general._id}`);
		// console.log(`Clique Channels: ${channels.length}`);
		// console.log(`Current Clique Channel: ${channel.name}, ${channel._id}`);
		// console.log(`Target Channel: ${targetChannel.name}, ${targetChannel._id}`);
		// console.log(`------`);
	}

	function loadUserData() {
		const userName = localStorage.getItem('userName');
		const userToken = localStorage.getItem('token');
		const user = {
			name: userName,
			token: userToken,
			// channel: channel,
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

	// async function getChannels()  {

	// 	const response = await fetch(`${APIurl}/channels`);
	// 	const channels = await response.json();
	// 	// console.log(`Got Channels: ${channels.length}`);
	// 	// console.log(...channels);
	// 	return channels;
	// }

	// async function getGeneral() {
	// 	const response = await fetch(`${APIurl}/general`);
	// 	const channel = await response.json();
	// 	// console.log(`Got General: ${channel.name}`);
	// 	// console.log(channel);
	// 	return channel;
	// }

	// Get all users that are logged in
	async function getUsers() {
		const response = await fetch(`${APIurl}/users/loggedIn`);
		const users = await response.json();
		// console.log(`Got Users: ${users.length}`);
		// console.log(...users);
		return users;
	}

	// function changeTargetChannel(channel) {
	// 	// setTargetChannel(Object.assign({}, channel));
	// 	// setTargetChannel(channel);
	// 	setTargetChannel(channel);
	//     printReport();
	// 	// console.log(`Set Target Channel: ${targetChannel.name}, ${targetChannel._id}`)
	// }

	function configureSocket() {

		socket.on('connection', () => {
			console.log(`Socket connected: ${socket.id}`);
		});

		socket.on('message', (message) => {
			// Message logic here
			console.log(`${message.messageData.sender}: ${message.messageData.text}`);
		});
	
		// setSocket(socket);
	};

	// function joinChannel(channel) {
	// 	console.log(`Attemping to join channel:`);
	// 	console.log(channel);
	// 	if (channel) {
	// 		// setChannel(Object.assign({}, channel));
	// 		setChannel(channel);
	// 		changeTargetChannel(channel);
	// 		localStorage.setItem('channel', channel._id);
	// 		socket.emit('channel-join', channel._id);
	// 		// printReport();
	// 	}
	// 	else {
	// 		console.log('Cant join channel - Not found');
	// 	}
	// };

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

							<article className='wireframe'>
								<MainView 
									// joinChannel={joinChannel} 
									/>
							</article>

							<aside className='sidebar-right wireframe'>
								<Chat 
									socket={socket} 
									// general={general} 
									// channel={channel} 
									// targetChannel={targetChannel} 
									// changeTargetChannel={changeTargetChannel} 
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