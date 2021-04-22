import './styles/styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Navbar from './components/Navbar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import MainView from './components/MainView';


function App() {

  useEffect(() => {
    // load active user data from localStorage if it exists, in case of browser reload
    loadLocalStorage();
  }, [])

  function loadLocalStorage() {
    // TODO: Improve this by using Passport to save logged in user instead
    const userName = localStorage.getItem('userName');
    const userToken = localStorage.getItem('token');
    const currentChannel = localStorage.getItem('channel');
    const user = {
      name: userName,
      token: userToken,
      channel: currentChannel
    }
    if (user) {
      setActiveUser(user);
      setChannel(currentChannel);
    }

  }

  const blankUser = {
    name: null, 
    token: null,
    channel: null
  }
	const [activeUser, setActiveUser] = useState(blankUser); 

  const blankChannel = {
    name: '',
    particpants: 0,
    sockets: [],
    messages: []
  } 

  const [channel, setChannel] = useState(blankChannel);

  function handleLogout() {
		localStorage.clear();
		setActiveUser(blankUser);
	}

  return (
    <div>
      {/* <Navbar handleLogout={handleLogout} activeUser={activeUser} /> */}
      <Switch>

        <Route exact path='/'>
          {activeUser.name ? 
              <MainView channel={channel} setChannel={setChannel} handleLogout={handleLogout} activeUser={activeUser}/> : 
              <Login setActiveUser={setActiveUser}/>}
        </Route>

        <Route exact path='/signup'><CreateAccount /></Route>

      </Switch>
    </div>
  );
}

export default App;