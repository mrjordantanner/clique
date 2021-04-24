
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
} from './atoms';


//region [Purple]
function App() {

	// RECOIL STATES
	const [channels, setChannels] = useRecoilState(channelsAtom);
	const [channel, setChannel] = useRecoilState(channelAtom);

	const [general, setGeneral] = useRecoilState(generalAtom);



	const blankUser = {
		name: null,
		token: null,
		channel: null,
	};	
	
	// User we are currently logged in as
	const [activeUser, setActiveUser] = useState(blankUser);

	// All users currently logged in
	const [users, setUsers] = useState();

	// Channel user is currently in
	// const [channel, setChannel] = useState(null);

	// All chat channels (other than General)
	// const [channels, setChannels] = useState([]);
	// General chat channel (all users always connected to this)
	// const [generalChannel, setGeneralChannel] = useState();
	let generalChannel;

	// Socket this user is using
	const [socket, setSocket] = useState(null);

	// All messages in the current channel
	const [messages, setMessages] = useState([]);

	// const [channelToRender, setChannelToRender] = useState(generalChannel);

    // called from the Chat tabs, this tells the messages panel
    // which channel's messages to render
    // It does not join/leave any channels

    // TODO: Make sure these variables are referencing the channel object
    // that has data, not just the channel id

    // function displayGeneralMessages() {
    //     setChannelToRender(generalChannel);
    // }

    // function displayChannelMessages() {
    //     setChannelToRender(channel);
    // }

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

	function handleLogout() {
		localStorage.clear();
		setActiveUser(blankUser);
	}

 	// If a channel exists in localStorage, join that channel
	function joinLastChannel() {
		const currentChannelId = localStorage.getItem('channel');
		if (currentChannelId)
			joinChannelById(currentChannelId);
		
	}

  	function getGeneralChannel() {
		fetch(`${APIurl}/channels/name/General`)
			.then((res) => res.json())
			// .then((res) => console.log(`General channel: ${res}`))
			.then((res) => setGeneral(res))
			// .then(console.log(`General channel: ${generalChannel}`))
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
			// console.log('Socket: CHANNEL');
			// channels.forEach(c => {
			//     if (c._id === channel._id) {
			//         c.participants = channel.participants;
			//     }
			// });
			setChannel(channel);
			console.log(`Set channel: ${channel.name}`);
		});

		// 3) Listen for new messages
		socket.on('message', (message) => {
			// Iterate through channels and find which one the incoming
			// message belongs in.  Then push it into that channel's messages
			// array.
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

		setSocket(socket);
	};

	function joinChannelById(id) {
		let channel = channels.find((c) => {
			return c._id === id;
		});

		setChannel(channel);
		localStorage.setItem('channel', channel._id);
		socket.emit('channel-join', id);//, () => {});
		// console.log(`${channel.name} channel selected.`);
	};

	// const handleSendMessage = (channelId, formValue) => {
	// 	// Construct outgoing messageData object
	// 	const messageData = {
	// 		text: formValue,
	// 		channelId: channelId,
	// 		socketId: socket.id,
	// 		sender: localStorage.getItem('userName'),
	// 		id: Date.now(),
	// 	};

	// 	// Post message to database
	// 	axios({
	// 		url: `${APIurl}/messages`,
	// 		method: 'POST',
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 		},
	// 		data: messageData,
	// 	}).catch(console.error);

	// 	// 1) Emit message to the backend
	// 	socket.emit('send-message', { messageData });
	// };




	return (
		<div>
			<Switch>
				<Route exact path='/'>
					{activeUser.name ? (
						// <MainView
						// 	channel={channel}
						// 	setChannel={setChannel}
						// 	handleLogout={handleLogout}
						// 	activeUser={activeUser}
						// 	channels={channels}
						// 	generalChannel={generalChannel}
						// 	handleChannelSelect={handleChannelSelect}
						// 	handleSendMessage={handleSendMessage}
						// />

						<div className='grid'>
							<header className='wireframe'>
								<Navbar handleLogout={handleLogout} activeUser={activeUser} />
							</header>

							<aside className='sidebar-left wireframe'>
								<SideBar />
							</aside>

							<article className='wireframe'>
								<MainView />

								{/* <div className='channelList'>
									{channels.length > 0 ? (
										channels.map((c) => (
											<Channel
												key={c._id}
												id={c._id}
												name={c.name}
												// participants={c.participants}
												messages={c.messages}
												onClick={handleClick}
											/>
										))
									) : (
										<div>No channels</div>
									)}
								</div>
								); */}


							</article>

							<aside className='sidebar-right wireframe'>
								<Chat socket={socket}/>
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