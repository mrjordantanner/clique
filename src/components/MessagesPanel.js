import React from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

export default function MessagesPanel({ channel, handleSendMessage }) {

    return (
        <div className='messages-panel'>
            <div className="messages-list">
                {channel && channel.messages ? 
                    channel.messages.map(m => 
                    <Message 
                        key={m._id} 
                        id={m._id} 
                        sender={m.sender} 
                        text={m.text} 
                        />) :
                    <div className="no-content-message">No messages.</div>
                }
            </div>

            <MessageInput channel={channel} handleSendMessage={handleSendMessage}/>
            
        </div>
    );
  
}