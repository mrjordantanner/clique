//https://github.com/davidzas/react-chat/blob/master/src/chat/Chat.js
import React, { useEffect, useState } from 'react';
import ChannelList from '../components/ChannelList';
import MessagesPanel from '../components/MessagesPanel';
import socketClient from "socket.io-client";
import APIurl from '../config';
import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
  } from 'recoil';

//#region [Violet]
export default function Chat() {

    const SERVER = "http://127.0.0.1:8080";

    const channelState = {
        name: '',
        particpants: 0,
        sockets: [],
        messages: []
    }

    const [channels, setChannels] = useState([]);
    const [socket, setSocket] = useState(null);
    const [channel, setChannel] = useState(channelState);

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

        var socket = socketClient(SERVER);

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
        });

        socket.on('message', message => {
            console.log('Socket: MESSAGE');
            channels.forEach(c => {
                if (c._id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            // setChannels(channels);
        });
        setSocket(socket);
    }

    const handleChannelSelect = (id) => {
			let channel = channels.find((c) => {
				return c._id === id;
			});
			setChannel(channel);
            
			socket.emit('channel-join', id, (ack) => {});
			console.log(`${channel.name} channel selected.`);
		};

    const handleSendMessage = (channel_id, text) => {

        // TODO: Create message in DB here

        socket.emit('send-message', { channel_id, text, sender: socket.id, id: Date.now() });
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