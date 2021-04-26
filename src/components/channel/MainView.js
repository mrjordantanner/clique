import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
import Channels from './Channels';
import Container from '../../components/DnD/Container';


export default function MainView({ joinChannel, leaveChannel, activeUser, currentChannel }) {

    let Draggable = require('react-draggable');
	const container = useRef();

    return (
		<div className=''>
			<div className='widget-container' ref={container}>

			<Widget activeUser={activeUser} />

			<Channels joinChannel={joinChannel} />

			{/* <Container /> */}

			{currentChannel &&
				<button className='channel-item' onClick={leaveChannel}>
					Leave Channel
				</button>
			}


			</div>
		</div>
	);
}
