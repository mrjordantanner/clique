import React from 'react'
import Chat from '../components/Chat';
import WidgetView from '../components/WidgetView';

export default function MainView() {

    return (
        <div className='grid-container'>
            <Chat className='chat-grid'/>
            <WidgetView className='main-grid'/>
        </div>
    )
}
