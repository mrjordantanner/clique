import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelState as channelAtom,
	channelViewState as channelViewAtom,
	messagesState as messagesAtom,
} from '../atoms';


export default function MessageInput({ handleSendMessage } ) {

    const [formValue, setFormValue] = useState('');

	const channel = useRecoilValue(channelAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);
    const [messages, setMessages] = useRecoilState(messagesAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSendMessage(channel._id, formValue);
		setMessages(channel.messages)
		setChannelView(channel);
        setFormValue('');
      }

    return (
			<div>
				<form className='messages-input' onSubmit={handleSubmit}>
					<input
						value={formValue}
						onChange={(e) => setFormValue(e.target.value)}
						placeholder='Enter message'
					/>

					<button type='submit' disabled={!formValue}>
						SEND
					</button>
				</form>
			</div>
		);
}
