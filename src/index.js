import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { RecoilRoot } from 'recoil';

ReactDOM.render(
	// <DndProvider backend={HTML5Backend}>
	// <RecoilRoot>
		<Router>
			<App />
		</Router>
	// </RecoilRoot>
	// </DndProvider>
	,
	document.getElementById('root')
);
