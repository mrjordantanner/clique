import React, { useEffect, useState } from 'react';
import APIurl from '../../config';
import Loading from '../Loading';
import HexNode from '../svg/HexNode';
import HexNodeActive from '../svg/HexNodeActive';

export default function ChannelSlot ( { channelId, handleClick, channel, currentChannel }) {

    const click = () => {
        handleClick();
    }



    // Represents a single slot that a user can occupy in the channel




    return (

        <div className='channel-slot' onClick={click}>

            {currentChannel?._id === channelId ? <HexNodeActive /> : <HexNode />}

        </div>


	);
   
}