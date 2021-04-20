//https://github.com/davidzas/react-chat/blob/master/src/chat/Chat.js

import React, { useEffect, useState } from 'react';
import ChannelList from '../components/ChannelList';
import '../chat.scss';
import MessagesPanel from '../components/MessagesPanel';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

export default function Chat() {

    const [channels, setChannels] = useState([]);
    const [channel, setChannel] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        loadChannels();
        configureSocket();
    }, [])

    const loadChannels = async () => {
        fetch('http://localhost:8080/getChannels')
        .then(async response => {
            let data = await response.json();
            setChannels(data.channels);
        })
        .then(console.log(channels));
        // .then(configureSocket());

    }

    const configureSocket = () => {

        var socket = socketClient(SERVER);

        // New client connected
        socket.on('connection', () => {
            console.log('ON CONNECTION');
             // join General chat
            if (channels.length > 0) {
                channel &&
                    handleChannelSelect(channels[0].id);  
            }
            
        });

        // 
        socket.on('channel', channel => {

            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setChannels(channels);

        });


        socket.on('message', message => {

            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setChannels(channels);
           
        });
        setSocket(socket);
    }



    const handleChannelSelect = id => {
        let channel = channels.find(c => {
            return c.id === id;
        });
        setChannel(channel);
        socket.emit('channel-join', id, ack => {
        });
        console.log(`${channel.name} channel selected.`)
    }




    const handleSendMessage = (channel_id, text) => {
        socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
    }





    return (
        <div className='chat-app'>
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