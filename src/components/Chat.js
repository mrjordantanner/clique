import React, { useEffect, useRef, useState } from 'react';

import GeneralChat from './GeneralChat';
import ChannelChat from './ChannelChat';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';
import APIurl from '../config';
import axios from 'axios';

//region [Blue]
export default function Chat({ socket, channel }) {

	const [targetChannel, setTargetChannel] = useState(null);

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
				<ChannelTab channel={channel} showGeneral={showGeneral} />
			</div>

			{general ? (
				<GeneralChat socket={socket} />
			) : (
				<ChannelChat channel={channel} socket={socket} />
			)}
		</div>
	);
}
//endregion
