import React from 'react';
import Channel from '../components/Channel';

export default function ChannelList(props) {

    const handleClick = id => {
        props.onSelectChannel(id);
    }

    return (
        <div className='channel-list'>
            {props.channels.length > 0 ?
                props.channels.map(c => 
                    <Channel 
                        key={c.id} 
                        id={c.id} 
                        name={c.name} 
                        participants={c.participants} 
                        onClick={handleClick}
                    />) :
                <div className="no-content-message">No channels</div>
            }
        </div>);
}