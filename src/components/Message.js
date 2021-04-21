import React from 'react';

export default function Message({ sender, text }) {

    return (
        <div className='message-item'>
            <div><b>{sender}</b></div>
            <span>{text}</span>
        </div>
    )
 
}