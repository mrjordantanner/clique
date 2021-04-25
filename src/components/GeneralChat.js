import React, { useState, useRef, useEffect } from 'react'
import Loading from './Loading';
import Message from './Message';
import MessageInput from './MessageInput';
import APIurl from '../config';
import axios from 'axios';

//region [Midnight]
export default function GeneralChat( { socket } ) {

	const bottom = useRef();
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);

      // or should the state be messages, and do setMessages(res.messages) in useeffect?


	useEffect(() => {
		fetch(`${APIurl}/general`)
			.then((res) => res.json())
			.then((res) => setChannel(res))
            // .then((res) => setMessages(res.messages))    
			.catch(console.error);

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
			url: `${APIurl}/messages/general`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: messageData,
        })
			.then(({ data }) => {   
				setMessages(data.messages);
			})
			.catch(console.error);

		// 1) Emit message to the backend
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