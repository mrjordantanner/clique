import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
import Channels from './Channels';

export default function MainView({ joinChannel, leaveChannel }) {

    let Draggable = require('react-draggable');
	const container = useRef();

    return (
		<div className='wireframe'>
			<div className='widget-container' ref={container}>

			<Widget />

			<Channels joinChannel={joinChannel} />


			<div className='channel-item' onClick={leaveChannel}>
				Leave Channel
			</div>


			</div>
		</div>
	);
}
