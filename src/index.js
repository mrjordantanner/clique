import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.render(
	<DndProvider backend={HTML5Backend}>
		<Router>
			<App />
		</Router>
	</DndProvider>,
	document.getElementById('root')
);
