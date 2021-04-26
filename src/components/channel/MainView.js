import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
import Channels from './Channels';
import Container from '../../components/DnD/Container';


export default function MainView({ joinChannel, leaveChannel, activeUser, currentChannel, incrementClickCounter }) {

    let Draggable = require('react-draggable');
	const container = useRef();

    return (
		<div className=''>
			<div className='widget-container' ref={container}>

			<Widget activeUser={activeUser} incrementClickCounter={incrementClickCounter} />

			<Channels joinChannel={joinChannel} currentChannel={currentChannel} />

			{/* <Container /> */}




			</div>

			{currentChannel &&
				<button className='leave-channel-button' onClick={leaveChannel}>
					Leave Channel
				</button>
			}

		</div>
	);
}
