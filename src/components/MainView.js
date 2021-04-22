import React from 'react'
import WidgetView from './WidgetView';
import SideBar from './SideBar';
import Navbar from './Navbar';
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
        <div className="grid">
          <header className='wireframe'>
            <Navbar handleLogout={handleLogout} activeUser={activeUser} />
          </header>
        
          <aside className='sidebar-left wireframe'>
            <SideBar />
          </aside>
        
          <article className='wireframe'>
            <WidgetView channels={channels} handleChannelSelect={handleChannelSelect} channel={channel} setChannel={setChannel}/>
            {/* <Container /> */}  
          </article>
        
          <aside className='sidebar-right wireframe'>
            {/* <Chat channel={channel} setChannel={setChannel} handleSendMessage={handleSendMessage} /> */}
            <MessagesPanel  
                handleSendMessage={handleSendMessage} 
                channel={channel} 
                />
          </aside>

        </div>

    )
}
