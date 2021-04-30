import React, { useEffect, useState } from 'react';
// import UserSlot from './UserSlot';
import APIurl from '../../config';
import Loading from '../Loading';
import HexSocket from '../../svg/hex-socket.svg';
import HexSocketActive from '../../svg/hex-socket-active.svg';
import HexNode from '../svg/HexNode';
import HexNodeActive from '../svg/HexNodeActive';

export default function Channel( { id, joinChannel, currentChannel }) {

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

					{currentChannel?._id === id ? <HexNodeActive /> : <HexNode />}
				</div>
			</div>
		);
   
}