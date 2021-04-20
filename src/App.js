import './App.css';
import './chat.scss';

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Chat from './components/Chat';

// const ENDPOINT = "http://127.0.0.1:4001";

function App() {

	const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(null); 

  const handleLogout = () => {
		localStorage.clear();
		setActiveUser(null);
	}

  return (
    <div>
      <Navbar handleLogout={handleLogout}/>
      <Switch>
        <Route exact path='/' render={() => <Home />} />

        <Route
          exact
          path='/login'
          render={() => (
            <Login
              users={users}
              activeUser={activeUser}
              setActiveUser={setActiveUser}
            />
          )}
        />

        <Route
          exact
          path='/createaccount'
          render={() => (
            <CreateAccount />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;