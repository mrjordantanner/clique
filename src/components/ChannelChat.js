import React, { useState, useRef, useEffect } from 'react'
import Loading from './Loading';
import Message from './Message';
import MessageInput from './MessageInput';
import APIurl from '../config';
import axios from 'axios';

//region [Navy]
export default function ChannelChat( { messages, setMessages, currentChannel, socket } ) {

	const bottom = useRef();
    const [channel, setChannel] = useState(null);
    // const [messages, setMessages] = useState([]);

	useEffect(() => {

        if (currentChannel) {
            fetch(`${APIurl}/channels/${currentChannel._id}`)
			.then((res) => res.json())
			.then((res) => setChannel(res))
			.catch(console.error);
        }

        scrollToBottom();
	}, [messages]);

    function scrollToBottom() {
        bottom.current?.scrollIntoView();
    };

	if (!channel) {
		return <Loading />;
	}

    const handleSendMessage = (formValue) => {
		const messageData = {
			text: formValue,
			channelId: channel._id,
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