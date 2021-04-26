import React, {useState, useEffect} from 'react';
import socketClient from "socket.io-client";
import APIurl from '../../config';

import GeneralChat from './GeneralChat';
import ChannelChat from './ChannelChat';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';

//region [Blue]
export default function Chat({
	general,
	setGeneral,
	messages,
	setMessages,
	currentChannel,
}) {

	const socket = socketClient(APIurl);
	configureSocket();

	function configureSocket() {

		socket.on('connection', () => {
			// console.log(`Socket connected: ${socket.id}`);
		});

		// Receive message from server
		socket.on('push', (message) => {
			console.log('push');
			setMessages([message]);
		});

	};

	return (
		<div className='chat-container'>
			<div className='tab-container'>
				<GeneralTab setGeneral={setGeneral} />
				<ChannelTab 
					currentChannel={currentChannel} 
					setGeneral={setGeneral} />
			</div>

			{general ? (
				<GeneralChat
					socket={socket}
					messages={messages}
					setMessages={setMessages}
				/>
			) : (
				<ChannelChat
					socket={socket}
					currentChannel={currentChannel}
					messages={messages}
					setMessages={setMessages}
				/>
			)}

			
		</div>
	);
}
//endregion
