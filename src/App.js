
import './styles/styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketClient from "socket.io-client";

import MainView from './components/channel/MainView';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Channel from './components/channel/Channel';
import Login from './components/account/Login';
import CreateAccount from './components/account/CreateAccount';
// import MainView from './components/MainView';
import APIurl from './config';
import axios from 'axios';

import { useRecoilState } from 'recoil';
import {
	channelsState as channelsAtom,
	channelState as channelAtom,
	channelViewState as channelViewAtom,
	generalState as generalAtom,
	messagesState as messagesAtom
} from './atoms';


//region [Violet]
function App() {

	// RECOIL STATES
	const [channels, setChannels] = useRecoilState(channelsAtom);
	const [channel, setChannel] = useRecoilState(channelAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);
	const [general, setGeneral] = useRecoilState(generalAtom);
    const [messages, setMessages] = useRecoilState(messagesAtom);

	const blankUser = {
		name: null,
		token: null,
		channel: null,
	};	
	
	// User we are currently logged in as
	const [activeUser, setActiveUser] = useState(blankUser);

	// All users currently logged in
	const [users, setUsers] = useState();

	// Socket this user is using
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		loadUserData();
   		 // getUsers();
		getChannels();
    	getGeneralChannel();
	  		// joinGeneralChannel();
		// joinLastChannel();
	}, []);

	// load active user data from localStorage if it exists, in case of browser reload
	// TODO: Improve this by using Passport to save logged in user instead
	function loadUserData() {
		const userName = localStorage.getItem('userName');
		const userToken = localStorage.getItem('token');
		const user = {
			name: userName,
			token: userToken,
			channel: channel,
		};
		if (user) {
			setActiveUser(user);
		}
	}

	// Mark user as logged out and clear localStorage user references
	function handleLogout() {
		axios
		.patch(`${APIurl}/users/logout/${activeUser.name}`) 
		.catch((err) => console.error(err));
		localStorage.clear();
		setActiveUser(blankUser);
	}

 	// If a channel exists in localStorage, join that channel
	function joinLastChannel() {
		const currentChannelId = localStorage.getItem('channel');
		if (currentChannelId)
			joinChannel(currentChannelId);
	}

  	function getGeneralChannel() {
		fetch(`${APIurl}/channels/general`)
			.then((res) => res.json())
			// .then((res) => console.log(`General channel res: ${res.name}`))
			.then((res) => setGeneral(res))
			.then(configureSocket())
			.then(setChannelView(general))
			.catch(console.error);
	}

	function getChannels() {
		fetch(`${APIurl}/channels`)
			.then((res) => res.json())
			.then((res) => setChannels(res))
			.then(configureSocket())
			.catch(console.error);
	}

  // TODO: Check which users are authenticated and only return those
  function getUsers() {
    fetch(`${APIurl}/users`)
    .then((res) => res.json())
    .then((res) => setUsers(res))
    .catch(console.error);
  }

	const configureSocket = () => {
		const socket = socketClient(APIurl);

		socket.on('connection', () => {
			console.log('Socket connected.');
		});

   		socket.on('connection-general', () => {
			console.log('Socket connected to general channel.');
		});

		socket.on('channel', (channel) => {
			setChannel(channel);
			console.log(`Set channel: ${channel.name}`);
		});

		// 3A) Listen for new CHANNEL messages
		socket.on('channel-message', (message) => {
			channels.forEach((c) => {
				if (c._id === message.channel_id) {
					if (!c.messages) {
						c.messages = [message];
					} else {
						c.messages.push(message);
					}
				}
				setMessages(c.messages);
			});

			console.log(`${message.messageData.sender}: ${message.messageData.text}`);
		});

		// 3B) Listen for new GENERAL messages
		socket.on('general-message', (message) => {
			console.log(`${message.messageData.sender}: ${message.messageData.text}`);
			console.log(`General: ${general}`);
				general.messages?.push(message);
				setMessages(general.messages);
		});
	
		setSocket(socket);
	};

	function joinChannel(id) {
		let channel = channels.find((c) => {
			return c._id === id;
		});

		setChannel(channel);
		localStorage.setItem('channel', channel._id);
		socket.emit('channel-join', id);
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

							<article className='wireframe'>
								<MainView />
							</article>

							<aside className='sidebar-right wireframe'>
								<Chat socket={socket} configureSocket={configureSocket} />
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