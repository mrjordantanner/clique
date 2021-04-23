import React from 'react'
import ChannelView from '../components/channel/ChannelView';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Chat from './Chat';
import Container from './DnD/Container';

export default function MainView({
  channel, 
  setChannel, 
  channels, 
  handleChannelSelect, 
  handleLogout, 
  activeUser, 
  handleSendMessage
}) {

    return (
			<div className='grid'>
				<header className='wireframe'>
					<Navbar handleLogout={handleLogout} activeUser={activeUser} />
				</header>

				<aside className='sidebar-left wireframe'>
					<SideBar />
				</aside>

				<article className='wireframe'>
					<ChannelView
						channels={channels}
						handleChannelSelect={handleChannelSelect}
						channel={channel}
						setChannel={setChannel}
					/>
				</article>

				<aside className='sidebar-right wireframe'>
					<Chat handleSendMessage={handleSendMessage} channel={channel} />
				</aside>
			</div>
		);
}
