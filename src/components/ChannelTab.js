import React from 'react';

export default function ChannelTab( { channel, showGeneral } ) {

	function handleClick(e) {
		e.preventDefault();
        showGeneral(false);
	}

	return (
		<form className='channel-tab wireframe'>
			{channel ? (
				<button onClick={handleClick}>{channel.name}</button>
			) : (
				<button disabled={true}>
					No Clique Channel
				</button>
			)}
		</form>
	);
}
