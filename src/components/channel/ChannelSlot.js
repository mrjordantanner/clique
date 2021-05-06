import React, { useState } from 'react';
import HexNode from '../svg/HexNode';
import HexNodeActive from '../svg/HexNodeActive';

export default function ChannelSlot ( { channelId, handleClick, channel, currentChannel }) {

    // Represents a single slot that a user can occupy in the channel

    const click = () => {
        handleClick();
    }








    return (

        <div className='channel-slot' onClick={click}>

            {currentChannel?._id === channelId ? <HexNodeActive /> : <HexNode />}

        </div>


	);
   
}