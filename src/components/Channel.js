import React from 'react';

export default function Channel( { name, participants, handleClick } ) {

    // const handleClick = () => {
    //     this.props.onClick(this.props.id);
    // }

    return (
        <div className='channel-item' onClick={handleClick}>
            <div>{name}</div>
            <span>{participants}</span>
        </div>
    )
   
}