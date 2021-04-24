import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelViewState as channelViewAtom,
    generalState as generalAtom,
} from '../atoms';

export default function GeneralTab() {

    function handleClick(e) {
        e.preventDefault();
        setChannelView(general);
        console.log(`ChannelView: ${general.name}`);
    }

    const general = useRecoilValue(generalAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);

    return (
        <form className='channel-tab wireframe'>
            <button onClick={handleClick}>General</button>
        </form>
    )
}
