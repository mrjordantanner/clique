import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';
import APIurl from '../config';
import axios from 'axios';

import { useRecoilState, useRecoilValue, useSetRecoilState  } from 'recoil';
import {
	channelViewState as channelViewAtom,
	channelsState as channelsAtom,
    channelState as channelAtom,
    messagesState as messagesAtom,
    // generalState as generalAtom,
} from '../atoms';

//region [Blue]
export default function Chat( { socket, configureSocket, printReport, refreshChannels } ) {

	function getChannelById(id) {
		return channels.find(c => c._id === id)
	}

	const bottom = useRef();

    const channel = useRecoilValue(channelAtom);
	const channels = useRecoilValue(channelsAtom);
    const [channelView, setChannelView] = useRecoilState(channelViewAtom);

	// const [channelView, setChannelView] = useState('001');

    // const general = useRecoilValue(generalAtom);
    // const [messages, setMessages] = useRecoilState(messagesAtom);

	const messages = useRecoilValue(messagesAtom);
	const setMessages = useSetRecoilState(messagesAtom);


	useEffect(() => {

        // TODO: Put re-render code here
		scrollToBottom();
		printReport();
		// refreshChannels();
		
		// setMessages(getChannelById(channelView)?.messages);

	}, [channelView]);



	const scrollToBottom = () => {
		// bottom.current?.scrollIntoView({ behavior: 'smooth' });
        bottom.current?.scrollIntoView();
	};

		const handleSendMessage = (channelId, formValue) => {
			const messageData = {
				text: formValue,
				channelId: channelId,
				// socketId: socket.id,
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
			})
			.catch(console.error);
					
			setChannelView(channelId);
			setMessages(getChannelById(channelId).messages);
			console.log(getChannelById(channelId).messages);

			

			// 1) Emit message to the backend
			socket.emit('send-message', { messageData });
		};



	return (
		<div className='chat-container'>
			<div className='tab-container'>
				<GeneralTab />
				<ChannelTab />
			</div>

            <div className='messages-panel wireframe'>
                {messages ? (
                    messages.map((m) => (
                        <Message key={m._id} id={m._id} sender={m.sender} text={m.text} />
                    ))
                ) : (
                    <div>No messages.</div>
                )}
                <div ref={bottom}></div>
            </div>

			<MessageInput 
                channel={channel} 
				handleSendMessage={handleSendMessage}
            />
		</div>
	);
}
//endregion
