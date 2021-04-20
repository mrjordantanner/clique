import './styles.scss';
// import './style.css';

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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

	const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(null); 

  const handleLogout = () => {
		localStorage.clear();
		setActiveUser(null);
	}

  return (
    <div>
      <Navbar handleLogout={handleLogout} activeUser={activeUser}/>
      <Switch>
        <Route exact path='/' component={() => <Home />} />

        <Route exact path='/chat' render={() => <MainView />} />


        <Route
          exact
          path='/login'
          render={() => (
            <Login
              users={users}
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