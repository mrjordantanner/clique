import React, { useState, useEffect } from 'react';
import APIurl from '../../config';
import Channel from './Channel';
import Loading from '../Loading';

const Channels = ( { joinChannel } ) => {

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
        <div className='channels-wrapper'>
			<div className='channels-container'>
				{channels.map((c) => {
					return <Channel 
                        key={c._id} 
                        id={c._id} 
                        name={c.name} 
                        messages={c.messages}
                        joinChannel={joinChannel}
                    />;
				})}
			</div>
        </div>
    );
};

export default Channels;