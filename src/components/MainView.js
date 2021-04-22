import React from 'react'
import Chat from './Chat';
import WidgetView from './WidgetView';
import SideBar from './SideBar';
import Navbar from './Navbar';
import MessageInput from './MessageInput';
import Container from './DnD/Container';

export default function MainView({channel, setChannel, handleLogout, activeUser, handleSendMessage}) {

    return (
        // <div className='grid-container'>
        //     <Chat channel={channel} setChannel={setChannel} />
        //     <WidgetView />
        //     <SideBar />
        // </div>

        <div class="grid">
          <header className='wireframe'>
            <Navbar handleLogout={handleLogout} activeUser={activeUser} />
          </header>
        
          <aside className='sidebar-left wireframe'>
            
          </aside>
        
          <article className='wireframe'>
            <WidgetView />
            {/* <Container /> */}  
          </article>
        
          <aside className='sidebar-right wireframe'>
            <Chat channel={channel} setChannel={setChannel} />
          </aside>
          
          {/* <footer className='wireframe'>
            <MessageInput channel={channel} handleSendMessage={handleSendMessage}/>
          </footer> */}
        </div>

    )
}
