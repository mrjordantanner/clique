import React from 'react';
import Channel from '../components/Channel';

export default function ChannelList({ onSelectChannel, channels }) {

    const handleClick = id => {
        onSelectChannel(id);
    }


    return (
        <div className='channel-list'>
        {channels ?
            channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={handleClick} />) :
            <div className="no-content-message">No channels</div>
        }
        </div>);

}