import React from 'react'

export default function ChannelTab({ displayChannelMessages, channel }) {

    function handleClick(e) {
        e.preventDefault();
        displayChannelMessages();
    }

    return (
        <form className='channel-tab wireframe' >
            {channel ?
                 <button onClick={handleClick}>{channel.name}</button> :
                 <button className='disabled' disabled={true}>No channel</button>
             }
        </form>
    )
}
