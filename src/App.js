import './styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Navbar from './components/Navbar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import MainView from './components/MainView';

function App() {

  useEffect(() => {
    loadLocalStorage();

  }, [])

  function loadLocalStorage() {
    // TODO: Improve this by using Passport to save logged in user instead
    const userName = localStorage.getItem('userName');
    const userToken = localStorage.getItem('token');
    const user = {
      name: userName,
      token: userToken
    }
    user && 
      setActiveUser(user);
  }

  const blankUserState = {
    name: null, 
    token: null,
    channel: null
  }

	const [activeUser, setActiveUser] = useState(blankUserState); 

  const handleLogout = () => {
		localStorage.clear();
		setActiveUser(blankUserState);
	}

  return (
    <div>
      <Navbar handleLogout={handleLogout} activeUser={activeUser} />
      <Switch>

        <Route exact path='/'>
          {activeUser.name ? 
              <MainView /> : 
              <Login setActiveUser={setActiveUser}/>}
        </Route>

        <Route exact path='/signup'><CreateAccount /></Route>

      </Switch>
    </div>
  );
}

export default App;