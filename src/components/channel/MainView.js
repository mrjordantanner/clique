import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
import Container from '../../components/DnD/Container';
import Channels from './Channels';

export default function MainView({ joinChannel, leaveChannel, activeUser, currentChannel, addClick }) {


    return (
			<div className='main-view-wrapper'>
				<Widget activeUser={activeUser} addClick={addClick} />
				<Channels joinChannel={joinChannel} currentChannel={currentChannel} />
			</div>
		);
}
