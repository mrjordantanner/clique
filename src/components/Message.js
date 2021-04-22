import React from 'react';

export default function Message({ sender, text }) {


    return (
        <div className='message'>
            <p className='sender'>{sender}</p><p className='text'>{text}</p>
        </div>
	);
 
}