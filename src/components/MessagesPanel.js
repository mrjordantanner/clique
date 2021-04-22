import React, { useEffect, useRef } from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

export default function MessagesPanel({ channel, handleSendMessage }) {
    const dummy = useRef();
    useEffect(() => {
        scrollToBottom();
      }, [channel?.messages]);

      const scrollToBottom = () => {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
      }

    return (
        <div>
            <div className='messages-panel'>
                <div>
                    {channel && channel.messages ? 
                        channel.messages.map(m => 
                        <Message 
                            key={m._id} 
                            id={m._id} 
                            sender={m.sender} 
                            text={m.text} 
                            />) :
                        <div>No messages.</div>
                    }
                     <div ref={dummy}></div>
                </div>
            </div>

        <MessageInput channel={channel} handleSendMessage={handleSendMessage}/>

       
        </div>
    );
  
}