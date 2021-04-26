import React, { useState } from 'react';

export default function GeneralTab( { currentChannel, setGeneral } ) {

    const [selected, setSelected] = useState(true);

    function handleClick(e) {
        e.preventDefault();
        setGeneral(true);
        setSelected(true);
    }

    return (
        <>
            {selected ? (
                <form className='channel-tab selected'>
                    <button onClick={handleClick}>
                        <p>General Channel</p>
                    </button>
                </form>
            ) : (
                <form className='channel-tab'>
                    <button onClick={handleClick}>
                        <p>General Channel</p>
                    </button>
                </form>
            )}
        </>
    );
}
