import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';
import APIurl from '../config';
import axios from 'axios';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelViewState as channelViewAtom,
	channelsState as channelsAtom,
    channelState as channelAtom,
    messagesState as messagesAtom,
    generalState as generalAtom,
} from '../atoms';

//region [Blue]
export default function Chat( { generalChannel, socket } ) {
	// Renders chat-related components
	const dummy = useRef();

    const channel = useRecoilValue(channelAtom);
	const channels = useRecoilValue(channelsAtom);
	const channelView = useRecoilValue(channelViewAtom);
    const general = useRecoilValue(generalAtom);
    const [messages, setMessages] = useRecoilState(messagesAtom);

	useEffect(() => {

		scrollToBottom();

	}, [channel, channelView, messages]);

	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: 'smooth' });
	};

    const handleSendMessage = (channelId, formValue) => {
		// Construct outgoing messageData object
		const messageData = {
			text: formValue,
			channelId: channelId,
			socketId: socket.id,
			sender: localStorage.getItem('userName'),
			id: Date.now(),
		};

		// Post message to database
		axios({
			url: `${APIurl}/messages`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: messageData,
		}).catch(console.error);

		// 1) Emit message to the backend
		socket.emit('send-message', { messageData });
	};

	return (
		<div>
			<div className='tab-container'>
				<GeneralTab />
				<ChannelTab />
			</div>
			<div className='messages-panel'>
				<div>
					{channelView.messages ? (
						channelView.messages.map((m) => (
							<Message key={m._id} id={m._id} sender={m.sender} text={m.text} />
						))
					) : (
						<div>No messages.</div>
					)}
					<div ref={dummy}></div>
				</div>
			</div>

			<MessageInput channel={channel} handleSendMessage={handleSendMessage} />
		</div>
	);
}
//endregion
