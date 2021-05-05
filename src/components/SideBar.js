import React from 'react'

export default function SideBar({currentChannel, leaveChannel}) {
    return (
        <div className='sidebar-container'>
           {/* <p>Users</p> */}

           {currentChannel && (
				<button className='leave-channel-button' onClick={leaveChannel}>
					Leave Channel
				</button>
			)}
        </div>
    )
}
