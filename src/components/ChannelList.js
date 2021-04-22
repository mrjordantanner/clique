import React from 'react';
import Channel from '../components/Channel';

export default function ChannelList(props) {

    const handleClick = id => {
        props.onSelectChannel(id);
    }

    return (
        <div className='channelList'>
            {props.channels.length > 0 ?
                props.channels.map(c => 
                    <Channel 
                        key={c._id} 
                        id={c._id} 
                        name={c.name} 
                        // participants={c.participants} 
                        messages={c.messages}
                        onClick={handleClick}
                    />) :
                <div>No channels</div>
            }
        </div>);
}