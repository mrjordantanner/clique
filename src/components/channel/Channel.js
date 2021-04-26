import React, { useEffect, useState } from 'react';
// import UserSlot from './UserSlot';
import APIurl from '../../config';
import Loading from '../Loading';

export default function Channel( { id, joinChannel }) {

    // Represents chat channel in the Main View
    // Clicking (or dragging into) it passes up the channel id

    const [channel, setChannel] = useState(null);

    useEffect(() => {
        // let chan = channels?.find(c => c._id === channelId);
        fetch(`${APIurl}/channels/${id}`)
        .then((res) => res.json())
        .then((res) => setChannel(res))
        .catch(console.error);

    }, [])

    if (!channel) {
        return <div>{id}</div>;
    }

    const click = () => {
        joinChannel(channel);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{channel.name}</div>
        </div>
    )
   
}