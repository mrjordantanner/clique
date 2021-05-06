import React, { useState, useRef, useEffect } from 'react'
import Loading from '../Loading';
import Message from './Message';
import MessageInput from '../chat/MessageInput';
import APIurl from '../../config';
import axios from 'axios';

//region [Midnight]
export default function GeneralChat( { messages, setMessages, socket, activeUser } ) {

	const bottom = useRef();
    const [channel, setChannel] = useState(null);

    useEffect(() => {
		fetch(`${APIurl}/general`)
			.then((res) => res.json())
            .then((res) => setChannel(res))
			.catch(console.error);

        scrollToBottom();
	}, [messages]);

    function scrollToBottom() {
        bottom.current?.scrollIntoView();
    };

	if (!channel) {
		return null;
		// return <Loading />;
	}

    const handleSendMessage = (formValue) => {
		const messageData = {
			text: formValue,
			channelId: channel._id,
			sender: activeUser.name,
			id: Date.now()
		};

		// Post message to database
		axios({
			url: `${APIurl}/messages/general`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: messageData,
        })
            .catch(console.error)
			.then(({ data }) => {   
				setMessages(data.channel.messages);   
			})
			.catch(console.error);

		// Emit message to the backend
		socket.emit('send-message', { messageData });
	};

    return (
        <div>
            <div className='messages-panel wireframe'>
                {channel.messages ? (
                    channel.messages.map((m) => (
                        <Message key={m._id} id={m._id} sender={m.sender} text={m.text} />
                    ))
                ) : (
                    <div>No messages.</div>
                )}
                <div ref={bottom}></div>
            </div>

            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    );
}
//endregion