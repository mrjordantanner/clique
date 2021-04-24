import React, { useRef, useState, useEffect } from 'react';
import Widget from '../widgets/Widget';
import '../../styles/widgets.scss';
// import ChannelList from './ChannelList';
import Channel from './Channel';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	channelsState as channelsAtom,
	channelViewState as channelViewAtom,
} from '../../atoms';

export default function MainView(props) {

    let Draggable = require('react-draggable');

	const container = useRef();

	const channels = useRecoilValue(channelsAtom);

    const handleClick = id => {
        // props.handleChannelSelect(id);
    }

	


    return (
		<div className='wireframe'>
			<div className='widget-container' ref={container}>
				{/* <Widget pushColor={pushColor}/> 
			 */}
			 <Widget />

			 {/* <ChannelList 
                channels={props.channels}
                onSelectChannel={props.handleChannelSelect}
                /> */}

				<div className='channelList'>
					{channels.length > 0 ?
						channels.map(c => 
							<Channel 
								key={c._id} 
								id={c._id} 
								name={c.name} 
								// participants={c.participants} 
								messages={c.messages}
								onClick={handleClick}
							/>) :
						<div>No channels</div>
					}
				</div>


				{/* {widgets?.map((widget) => {
					return (
						<Widget key={widget.uid} />
					);
				})} */}

			</div>
		</div>
	);
}
