//https://github.com/davidzas/react-chat/blob/master/src/chat/Chat.js
import React, { useEffect, useState } from 'react';
import ChannelList from '../components/ChannelList';
import MessagesPanel from '../components/MessagesPanel';
import socketClient from "socket.io-client";
import APIurl from '../config';
import axios from 'axios';

//#region [Violet]
export default function Chat({ channel, setChannel }) {

    const [channels, setChannels] = useState([]);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadChannels();
        
    }, [])

    function loadChannels() {
        fetch(`${APIurl}/channels`)
        .then((res) => res.json())
        .then((res) => setChannels(res))
        .then(configureSocket())
        .catch(console.error);
    }

    const configureSocket = () => {

        var socket = socketClient(APIurl);

        socket.on('connection', () => {
            console.log('Socket: CONNECTION');
            if (channels.length > 0) {
                channel &&
                    handleChannelSelect(channels[0]._id);  
            }
        });

        socket.on('channel', channel => {
            // console.log('Socket: CHANNEL');
            // channels.forEach(c => {
            //     if (c._id === channel._id) {
            //         c.participants = channel.participants;
            //     }
            // });
            setChannel(channel)
            console.log(`Set channel: ${channel.name}`);
            // console.log(channels);
        });

        // 3) Listen for message coming from back end
        socket.on('message', message => {

            // Iterate through channels and find which one the incoming 
            // message belongs in.  Then push it into that channel's messages
            // array.
            channels.forEach(c => {
                if (c._id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
                setMessages(c.messages);
            });

            console.log(`Message: ${message.text}`);
            // setChannels(channels);
        });

        setSocket(socket);
    }

    const handleChannelSelect = (id) => {
			let channel = channels.find((c) => {
				return c._id === id;
			});

			setChannel(channel);
            localStorage.setItem('channel', channel._id);
			socket.emit('channel-join', id, (ack) => {});

			console.log(`${channel.name} channel selected.`);
		};

    const handleSendMessage = (channelId, formValue) => {

        // Construct outgoing messageData object
        const messageData = {
            text: formValue,
            channelId: channelId,
            socketId: socket.id,
            sender: localStorage.getItem('userName'),
            id: Date.now()
        }

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

        // 1) Emit message to other clients    
        socket.emit('send-message', {messageData});
    }

//#endregion

    return (
        <div>
            <h2>{channel?.name}</h2>
            <ChannelList 
                channels={channels}
                onSelectChannel={handleChannelSelect}
                />
            <MessagesPanel  
                handleSendMessage={handleSendMessage} 
                channel={channel} 
                />
        </div>
    );

}