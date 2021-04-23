import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import ChannelTab from './ChannelTab';
import GeneralTab from './GeneralTab';

export default function Chat({ channel, generalChannel, handleSendMessage }) {

    // Renders chat-related components 

    const dummy = useRef();

    const [channelToRender, setChannelToRender] = useState(generalChannel);

    // called from the Chat tabs, this tells the messages panel
    // which channel's messages to render
    // It does not join/leave any channels

    // TODO: Make sure these variables are referencing the channel object
    // that has data, not just the channel id
    function displayGeneralMessages() {
        setChannelToRender(generalChannel);
    }

    function displayChannelMessages() {
        setChannelToRender(channel);
    }



    useEffect(() => {
        scrollToBottom();
        console.log('Chat useEffect');
      }, [channelToRender]);

      const scrollToBottom = () => {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
      }

    return (
        <div>
            <div className='tab-container'>
                <GeneralTab displayGeneralMessages={displayGeneralMessages}/>
                <ChannelTab 
                    channel={channel} 
                    displayChannelMessages={displayChannelMessages}
                />
            </div>
            <div className='messages-panel'>
                <div>
                    {channelToRender && channelToRender.messages ? 
                        channelToRender.messages.map(m => 
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