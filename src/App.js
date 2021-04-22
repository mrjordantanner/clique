import './styles/styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketClient from "socket.io-client";

import Navbar from './components/Navbar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import MainView from './components/MainView';
import APIurl from './config';
import axios from 'axios';


function App() {

  const blankUser = {
    name: null, 
    token: null,
    channel: null
  }

	const [activeUser, setActiveUser] = useState(blankUser); 

  const [channel, setChannel] = useState(null)
  const [channels, setChannels] = useState([]);
  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    loadUserData();
    loadChannels();
    // enterCurrentChannel();

  }, [])

      // load active user data from localStorage if it exists, in case of browser reload
    // TODO: Improve this by using Passport to save logged in user instead
  function loadUserData() {
    const userName = localStorage.getItem('userName');
    const userToken = localStorage.getItem('token');
    const user = {
      name: userName,
      token: userToken,
      channel: channel
    }
    if (user) {
      setActiveUser(user);
    }
  }

  function handleLogout() {
		localStorage.clear();
		setActiveUser(blankUser);
	}

  function enterCurrentChannel() {
      const currentChannelId = localStorage.getItem('channel');
      if (currentChannelId) {
          handleChannelSelect(currentChannelId);
      }
  }

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

          console.log(`${message.messageData.sender}: ${message.messageData.text}`);
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

      // 1) Emit message to the backend  
      socket.emit('send-message', { messageData });
  }

//#endregion

  return (
		<div>
			{/* <Navbar handleLogout={handleLogout} activeUser={activeUser} /> */}
			<Switch>
				<Route exact path='/'>
					{activeUser.name ? (
						<MainView
							channel={channel}
							setChannel={setChannel}
							handleLogout={handleLogout}
							activeUser={activeUser}
							channels={channels}
							handleChannelSelect={handleChannelSelect}
							handleSendMessage={handleSendMessage}
						/>
					) : (
						<Login setActiveUser={setActiveUser} />
					)}
				</Route>

				<Route exact path='/signup'>
					<CreateAccount />
				</Route>
			</Switch>
		</div>
	);
}

export default App;