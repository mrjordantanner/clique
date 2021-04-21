//https://github.com/davidzas/react-chat/blob/master/src/chat/Chat.js
import React, { useEffect, useState } from 'react';
import ChannelList from '../components/ChannelList';
import MessagesPanel from '../components/MessagesPanel';
import socketClient from "socket.io-client";
import APIurl from '../config';
import axios from 'axios';

//#region [Violet]
export default function Chat({ channel, setChannel }) {

    const SERVER = "http://127.0.0.1:8080";

    const [channels, setChannels] = useState([]);
    const [socket, setSocket] = useState(null);
    // const [channel, setChannel] = useState(channelState);

    useEffect(() => {
        loadChannels();
        // configureSocket();
    }, [])

    function loadChannels() {
        fetch(`${APIurl}/channels`)
        .then((res) => res.json())
        .then((res) => setChannels(res))
        .then(configureSocket())
        .catch(console.error);
    }

    // const loadChannels = async () => {
    //     // fetch('http://localhost:8080/getChannels')
    //     // .then(async response => {
    //     //     let data = await response.json();
    //     //     setChannels(data.channels);
    //     // })
    //     // .then(console.log(channels));

    //     fetch(`${APIurl}/channels`)
    //     .then((res) => res.json())
    //     .then((res) => setChannels(res))
    //     .catch(console.error);


    // }

    const configureSocket = () => {

        // var socket = socketClient(SERVER);
        var socket = socketClient(APIurl);

        // New client connected
        socket.on('connection', () => {
            console.log('Socket: CONNECTION');
             // join General chat
             // TODO: FIX THIS
            if (channels.length > 0) {
                channel &&
                    handleChannelSelect(channels[0]._id);  
            }
        });

        socket.on('channel', channel => {
            console.log('Socket: CHANNEL');
            channels.forEach(c => {
                if (c._id === channel._id) {
                    c.participants = channel.participants;
                }
            });
            // setChannels(channels);
            setChannel(channel)
            console.log(`Set channel: ${channel.name}`);
            console.log(channels);
        });

        socket.on('message', message => {

            channels.forEach(c => {
                if (c._id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            console.log(`Message: ${message.text}`);
            console.log();
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

    const handleSendMessage = (channelId, text) => {

        // Create message in DB
        // Push into channel.messages[]

        axios({
			url: `${APIurl}/messages`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: {
                channelId,
                text
            },
		})
        .then(({ data }) => {

        })
        .catch(console.error);

        // Emit message to other clients    
        socket.emit('send-message', { 
            channelId, 
            text, 
            sender: socket.id,   // TODO: Change this to userName
            id: Date.now() 
        });
    }

//#endregion

    return (
        <div className='channel-list'>
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