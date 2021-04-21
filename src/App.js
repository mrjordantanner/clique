import './styles.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Chat from './components/Chat';
import WidgetView from './components/WidgetView';
import MainView from './components/MainView';
// const ENDPOINT = "http://127.0.0.1:4001";

function App() {

	// const [users, setUsers] = useState([]);

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
          {activeUser.token ? 
              <MainView /> : 
              <Login setActiveUser={setActiveUser}/>}
        </Route>

        {/* <Route
          exact
          path='/login'
          render={() => (
            <Login setActiveUser={setActiveUser} />
          )}
        /> */}

        <Route
          exact
          path='/signup'
          render={() => (
            <CreateAccount />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;