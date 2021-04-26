import React, { useEffect } from 'react';

export default function GeneralTab( { setGeneral } ) {

    function handleClick(e) {
        e.preventDefault();
        setGeneral(true);
    }

    return (
        <form className='channel-tab'>
            <button onClick={handleClick}>General Channel</button>
        </form>
    )
}
