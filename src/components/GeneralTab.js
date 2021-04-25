import React, { useEffect } from 'react';

export default function GeneralTab( { showGeneral } ) {

    function handleClick(e) {
        e.preventDefault();
        showGeneral(true);
    }

    return (
        <form className='channel-tab'>
            <button onClick={handleClick}>General Channel</button>
        </form>
    )
}
