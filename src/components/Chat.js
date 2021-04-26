import React, { useEffect, useRef, useState } from 'react';

import GeneralChat from './GeneralChat';
import ChannelChat from './ChannelChat';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';


//region [Blue]
export default function Chat({ messages, setMessages, socket, currentChannel }) {

	// Display general chat or not
	const [general, setGeneral] = useState(true);

	function showGeneral(value) {
		console.log(`Show general chat: ${value}`);
		setGeneral(value);
	}

	// function toggleChat() {
	// 	setGeneral(!general);
	// }

	return (
		<div className='chat-container'>
			<div className='tab-container'>
				<GeneralTab showGeneral={showGeneral} />
				<ChannelTab currentChannel={currentChannel} showGeneral={showGeneral} />
			</div>

			{general ? (
				<GeneralChat socket={socket} messages={messages} setMessages={setMessages} />
			) : (
				<ChannelChat currentChannel={currentChannel} socket={socket}  messages={messages} setMessages={setMessages}/>
			)}
		</div>
	);
}
//endregion
