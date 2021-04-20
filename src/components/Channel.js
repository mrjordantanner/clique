import React from 'react';

export default function Channel(props) {

    const click = () => {
        props.onClick(props.id);
    }

    return (
        <div className='channel-item' onClick={click}>
            <div>{props.name}</div>
            <span>{props.participants}</span>
        </div>
    )
   
}