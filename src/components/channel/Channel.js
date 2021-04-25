import React, { useEffect, useState } from 'react';
// import UserSlot from './UserSlot';

export default function Channel( { channels, channelId, joinChannel }) {

    // Represents chat channel in the Main View
    // Clicking (or dragging into) it passes up the channel id

    const [channel, setChannel] = useState(null);

    useEffect(() => {
        let chan = channels?.find(c => c._id === channelId);
        setChannel(chan);
    }, [])

    const click = () => {
        joinChannel(channel);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{channel?.name}</div>
        </div>
    )
   
}