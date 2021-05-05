import React, { useRef, useState, useEffect } from 'react';
import Container from '../../components/DnD/Container';
import APIurl from '../../config';
import Channel from './Channel';
import Loading from '../Loading';

export default function Channels( { joinChannel, currentChannel } ) {

	const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch(`${APIurl}/channels`)
        .then((res) => res.json())
        .then((res) => setChannels(res))
        .catch(console.error);
    }, [])

	if (!channels) {
        return <Loading />;
    }

    return (
				<div className='channels-container'>
					{channels.map((c) => {
						return (
							<Channel
								key={c._id}
								id={c._id}
								name={c.name}
								messages={c.messages}
								joinChannel={joinChannel}
								currentChannel={currentChannel}
							/>
						);
					})}
				</div>
    )
}
