import React from 'react';
import Channel from '../components/Channel';

export default function ChannelList(props) {

    const handleClick = id => {
        props.onSelectChannel(id);
    }

    return (
        <div>
            {props.channels.length > 0 ?
                props.channels.map(c => 
                    <Channel 
                        key={c._id} 
                        id={c._id} 
                        name={c.name} 
                        participants={c.participants} 
                        messages={c.messages}
                        onClick={handleClick}
                    />) :
                <div className="no-content-message">No channels</div>
            }
        </div>);
}