import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
import Channels from './Channels';

export default function MainView({ joinChannel }) {

    let Draggable = require('react-draggable');
	const container = useRef();

    return (
		<div className='wireframe'>
			<div className='widget-container' ref={container}>

			{/* <Widget /> */}

			{/* <Channels joinChannel={joinChannel} /> */}


			</div>
		</div>
	);
}
