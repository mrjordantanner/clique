import React from 'react'
import Chat from '../components/Chat';
import WidgetView from '../components/WidgetView';

export default function MainView({channel, setChannel}) {

    return (
        <div className='grid-container'>
            <Chat className='chat-grid' channel={channel} setChannel={setChannel} />
            <WidgetView className='main-grid'/>
        </div>
    )
}
