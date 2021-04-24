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
export default function Chat( { socket } ) {

	const bottom = useRef();

    const channel = useRecoilValue(channelAtom);
	const channels = useRecoilValue(channelsAtom);
    const [channelView, setChannelView] = useRecoilState(channelViewAtom);
    const general = useRecoilValue(generalAtom);
    const [messages, setMessages] = useRecoilState(messagesAtom);

	useEffect(() => {

        // TODO: Put re-render code here
		scrollToBottom();
        console.log(`Viewing Channel: ${channelView.name}`);
	}, [channel, channelView, messages]);

	const scrollToBottom = () => {
		// bottom.current?.scrollIntoView({ behavior: 'smooth' });
        bottom.current?.scrollIntoView();
	};

    // SEND MESSAGE TO CLIQUE CHANNEL
    const handleSendToChannel = (channelId, formValue) => {
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

        setMessages(channel.messages)
		setChannelView(channel);

		// 1) Emit message to the backend
		socket.emit('send-message-channel', { messageData });
	};

    //SEND MESSAGE TO GENERAL CHANNEL
    const handleSendToGeneral = (formValue) => {
		// Construct outgoing messageData object
		const messageData = {
			text: formValue,
			channelId: general._id,
			socketId: socket.id,
			sender: localStorage.getItem('userName'),
			id: Date.now(),
		};

		// Post message to database
		axios({
			url: `${APIurl}/messages/general`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: messageData,
		}).catch(console.error);

        setMessages(general.messages)
		setChannelView(general);

		// 1) Emit message to the backend
		socket.emit('send-message-general', { messageData });
	};

	return (
		<div className='chat-container'>
			<div className='tab-container'>
				<GeneralTab />
				<ChannelTab />
			</div>

            <div className='messages-panel wireframe'>
                {channelView.messages ? (
                    channelView.messages.map((m) => (
                        <Message key={m._id} id={m._id} sender={m.sender} text={m.text} />
                    ))
                ) : (
                    <div>No messages.</div>
                )}
                <div ref={bottom}></div>
            </div>

			<MessageInput 
                channel={channel} 
                handleSendToChannel={handleSendToChannel}
                handleSendToGeneral={handleSendToGeneral}
            />
		</div>
	);
}
//endregion
