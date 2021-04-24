import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelViewState as channelViewAtom,
    generalState as generalAtom,
} from '../atoms';

export default function GeneralTab() {

    const general = useRecoilValue(generalAtom);
	const [channelView, setChannelView] = useRecoilState(channelViewAtom);

    useEffect(() => {
        setChannelView(general);
    }, [])

    function handleClick(e) {
        e.preventDefault();
        setChannelView(general);
    }


    return (
        <form className='channel-tab'>
            <button onClick={handleClick}>General</button>
        </form>
    )
}
