import React from 'react';

export default function ChannelTab( { currentChannel, setGeneral } ) {

	function handleClick(e) {
		e.preventDefault();
        setGeneral(false);
	}

	return (
		<form className='channel-tab wireframe'>
			{currentChannel ? (
				<button onClick={handleClick}>{currentChannel.name}</button>
			) : (
				<button disabled={true}>
					No Clique Channel
				</button>
			)}
		</form>
	);
}
