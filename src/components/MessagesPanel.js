import React, { useEffect, useState } from 'react';
import Message from '../components/Message';

export default function MessagesPanel({ channel, handleSendMessage }) {


    // useEffect(() => {
    //     loadMessages();
    // }, [channel])



    const [state, setState] = useState({ input_value: '' });

    const send = () => {
        if (state.input_value && state.input_value !== '') {
            handleSendMessage(channel._id, state.input_value);
            setState({ input_value: '' });
        }
    }

    const handleInput = e => {
        setState({ input_value: e.target.value });
    }

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

            {channel &&
                <div className="messages-input">
                    <input type="text" onChange={handleInput} value={state.input_value} />
                    <button onClick={send}>Send</button>
                </div>
            }
        </div>
    );
  
}