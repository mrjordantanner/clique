import React, { useState } from 'react';

export default function GeneralTab( { currentChannel, setGeneral, general } ) {

    function handleClick(e) {
        e.preventDefault();
        setGeneral(true);
    }

    return (
        <>
           {general ? (
                <form className='general-tab selected'>
                    <button onClick={handleClick}>
                        <p>General Channel</p>
                    </button>
                </form>
            ) : (
                <form className='general-tab'>
                    <button onClick={handleClick}>
                        <p>General Channel</p>
                    </button>
                </form>
            )}
        </>
    );
}
