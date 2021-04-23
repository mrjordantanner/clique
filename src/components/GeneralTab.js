import React from 'react'

export default function GeneralTab({ displayGeneralMessages }) {

    function handleClick(e) {
        e.preventDefault();
        displayGeneralMessages();
    }

    return (
        <form className='channel-tab wireframe'>
            <button onClick={handleClick}>General</button>
        </form>
    )
}
