import React, { useEffect, useState } from 'react';
import ChannelSlot from './ChannelSlot';
import APIurl from '../../config';
// import Loading from '../Loading';
// import HexNode from '../svg/HexNode';
// import HexNodeActive from '../svg/HexNodeActive';

export default function Channel( { id, joinChannel, currentChannel }) {

    // Chat channel that users can join
    // Represented by a cluster of channelSlots users can socket into

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

                {channel?.channelSlots?.map((slot) => {
				return (
					<ChannelSlot
						key={slot._id}
						id={slot._id}
						handleClick={handleClick}
						channel={channel}
						currentChannel={currentChannel}
					/>
				);
			})}


			</div>
		);
   
}