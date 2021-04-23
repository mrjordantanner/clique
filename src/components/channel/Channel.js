import React, { useEffect, useState } from 'react';

export default function Channel(props) {

    // Currently, this is only a button the user clicks on
    // to change chat channels

    // Ideally, it will represent a group of userSlots that
    // users can drag their widgets into to connect to the channel
    const channelDataModel = {
        id: null,
        name: null,
        slots: null,      // array of userSlots in this channel
        users: null,      // array of users currently in the channel
        admin: null       // user who created the channel (only they can modify or delete it)
    }
    const [channelData, setChannelData] = useState(channelDataModel);

    const click = () => {
        props.onClick(props.id);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{props.name}</div>
            {/* <span>{props.participants}</span> */}
        </div>
    )
   
}