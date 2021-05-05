import React, { useEffect, useState } from 'react';
import ChannelSlot from './ChannelSlot';
import APIurl from '../../config';
import Loading from '../Loading';
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

    const handleClick = () => {
        joinChannel(channel);
    }

    return (
			<div className='channel'>
                <p className='channel-name'>{channel?.name}</p>         


				{/* <div className='channel-slot' onClick={click}>
					

					{currentChannel?._id === id ? <HexNodeActive /> : <HexNode />}
				</div> */}


                <ChannelSlot handleClick={handleClick} channel={channel} currentChannel={currentChannel} channelId={id} />



			</div>
		);
   
}