import React, { useEffect, useState } from 'react';
import UserSlot from './UserSlot';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelState as channelAtom,
    channelsState as channelsAtom,
	channelViewState as channelViewAtom,
} from '../../atoms';

export default function Channel(props) {

    // Currently, this is only a button the user clicks on
    // to change chat channels

    // Ideally, it will represent a group of userSlots that
    // users can drag their widgets into to connect to the channel
    // const channelDataState = {
    //     id: null,
    //     name: null,
    //     slots: null,      // array of userSlots in this channel
    //     users: null,      // array of users currently in the channel
    //     admin: null       // user who created the channel (only they can modify or delete it)
    // }
    // const [channelData, setChannelData] = useState(channelDataState);

    const channels = useRecoilValue(channelsAtom);
	const [channel, setChannel] = useRecoilState(channelAtom);
    const [channelView, setChannelView] = useRecoilState(channelViewAtom);

    const click = () => {
        // props.onClick(props.id);

		let thisChannel = channels.find((c) => {
			return c._id === props.id;
		});

        // TODO: Call join channel function
        setChannel(thisChannel);

        // Set channel view to this channel to trigger chat re-render
        setChannelView(thisChannel);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{props.name}</div>
            {/* <span>{props.participants}</span> */}
        </div>
    )
   
}