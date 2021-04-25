import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelState as channelAtom,
	channelViewState as channelViewAtom,
	messagesState as messagesAtom,
	generalState as generalAtom
} from '../atoms';


export default function MessageInput({ handleSendMessage } ) {

    const [formValue, setFormValue] = useState('');
	const general = useRecoilValue(generalAtom);
	const channel = useRecoilValue(channelAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);
    const [messages, setMessages] = useRecoilState(messagesAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();
		console.log(`InputField sending msg to channel: 
		${channelView.name}, ${channelView._id}`)

		handleSendMessage(channelView._id, formValue);

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
