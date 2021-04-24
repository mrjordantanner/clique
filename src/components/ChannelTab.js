import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelState as channelAtom,
	channelViewState as channelViewAtom,
} from '../atoms';

export default function ChannelTab() {

    const channel = useRecoilValue(channelAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);

	function handleClick(e) {
		e.preventDefault();
        setChannelView(channel);
	}

	return (
		<form className='channel-tab wireframe'>
			{channel ? (
				<button onClick={handleClick}>{channel.name}</button>
			) : (
				<button className='disabled' disabled={true}>
					No channel
				</button>
			)}
		</form>
	);
}
