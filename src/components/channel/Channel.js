import React, { useEffect, useState } from 'react';
// import UserSlot from './UserSlot';
import APIurl from '../../config';
import Loading from '../Loading';
import Hex from '../../svg/hex-socket.svg';

export default function Channel( { id, joinChannel }) {

    const [channel, setChannel] = useState(null);

    useEffect(() => {
        fetch(`${APIurl}/channels/${id}`)
        .then((res) => res.json())
        .then((res) => setChannel(res))
        .catch(console.error);

    }, [])

    if (!channel) {
        return null;
    }

    const click = () => {
        joinChannel(channel);
    }

    return (
        <div class='channel'>
            <div className='channel-item' onClick={click}>
                <div className='channel-name'>{channel?.name}</div>
                <img src={Hex} alt='hexagon' draggable="false"/>
            </div>
        </div>
    )
   
}