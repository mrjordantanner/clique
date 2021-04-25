
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

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
	channelsState as channelsAtom,
	channelState as channelAtom,
	channelViewState as channelViewAtom,
	// generalState as generalAtom,
	messagesState as messagesAtom,
	usersState as usersAtom,
	activeUserState as activeUserAtom,
} from './atoms';



//region [Violet]
function App() {

	function getChannelById(id) {
		// return channels.find(c => c._id === id)
		channels.filter((channel) => {
			return channel._id === id;
		})
	}

	// RECOIL STATES
	const [channels, setChannels] = useRecoilState(channelsAtom);
	const [channel, setChannel] = useRecoilState(channelAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);
	// const [general, setGeneral] = useRecoilState(generalAtom);

	const [users, setUsers] = useRecoilState(usersAtom);
	const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);

	const messages = useRecoilValue(messagesAtom);
	const setMessages = useSetRecoilState(messagesAtom);

	// const [messages, setMessages] = useRecoilState(messagesAtom);

	const [socket, setSocket] = useState();

	const blankUser = {
		name: null,
		token: null,
		channel: null,
	};	

	useEffect(() => {
		// init();

		getChannels();
   		getUsers();
		loadUserData();
		setChannelView('001');
		setMessages(getChannelById(channelView).messages);
		joinLastChannel();
		printReport();
	}, []);


	const reportHeaderStyle = 'background-color: #121212 ; color: magenta ; font-weight: bold ;'
	const reportRowStyle = 'background: #343434 ; color: lightgray ; font-weight: regular ; display: block ; width: 100%; '

	function printReport() {
		// console.clear();

		const targetChannel = getChannelById(channelView);

		console.log(`%c`, reportRowStyle);
		console.log(`%c--- Report ---`, reportHeaderStyle);
		// console.log(`%c`, reportRowStyle);
		console.log(`%cChannel: ${channel.name},${channel._id}`, reportRowStyle);
		console.log(`%cChannelView: ${targetChannel?.name}, ${targetChannel?._id}`, reportRowStyle);
		console.log(`%cChannelView.Messages: ${targetChannel?.messages?.length}`, reportRowStyle);
		console.log(`%cUsers logged in: ${users?.length}`, reportRowStyle);
		// console.log(`%cLatest Message: ${channelView?.messages[channelView?.messages?.length - 1 || 0]?.text}`, reportRowStyle);
		console.log(``);

	}

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

	function getChannels() {
		return fetch(`${APIurl}/channels`)
			.then((res) => res.json())
			.then((res) => setChannels(res))
		    .then(configureSocket())
			.then(() => {
				setChannelView('001');
				setMessages(getChannelById(channelView).messages)
				console.log(`.then Messages: ${messages}`)
			})
			.catch(console.error);
	}


  	// function getGeneralChannel() {
	// 	fetch(`${APIurl}/channels/general`)
	// 		.then((res) => res.json())
	// 		.then((res) => setGeneral(res))
	// 		// .then(setChannelView(general))
	// 		.then(configureSocket())
	// 		.then(console.log('got general'))
	// 		// .then(console.log(`Get General: ${JSON.stringify(general, null, 4)}`))

	// 			setMessages(channelView.messages);
	// 			console.log(`%cChannelView after loading:`, reportRowStyle)
	// 			console.log(channelView);

	// 		})			
	// 		.catch(console.error);
	// }

	// change how channelView works
	// make it hold the id of the channel in view, not a clone of the object




	// Get all users that are logged in
	function getUsers() {
		fetch(`${APIurl}/users/loggedIn`)
			.then((res) => res.json())
			.then((res) => setUsers(res))
			.catch(console.error);
	}

	const configureSocket = () => {

		const socket = socketClient(APIurl);

		socket.on('connection', () => {
			console.log(`Socket connected: ${socket.id}`);
		});

   		socket.on('connection-general', () => {
			console.log('Socket connected to general channel.');
		});

		socket.on('channel', (channel) => {
			setChannel(channel);
			console.log(`Set channel: ${channel.name}`);
		});

		// 3A) Listen for new CHANNEL messages
		socket.on('message', (message) => {
			channels.forEach((c) => {
				if (c._id === message.channel_id) {
					// if (!c.messages) {
					// 	c.messages = [message];
					// } else {
					const currentState = c.messages;
					setMessages((currentState) => [
						...currentState,
						message,
					  ]);
					// c.messages.push(message);
					// }
				}
				setMessages(c.messages);
			});

			console.log(`${message.messageData.sender}: ${message.messageData.text}`);
		});

		// 3B) Listen for new messages
		socket.on('message', (message) => {
			console.log('new msg received');

			
			// if (!general.messages) {
			// 	general.messages = [message];
			// } else {
			// 	general.messages.push(message);
			// }
			// setMessages(general.messages);
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
								<Chat socket={socket} configureSocket={configureSocket} printReport={printReport} getChannels={getChannels}/>
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