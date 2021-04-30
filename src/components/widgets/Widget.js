import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import anime from 'animejs';
import useSound from 'use-sound';
import boom from '../../audio/808_Soft.wav';
import { useDrag } from 'react-dnd';
import Hex from '../../svg/hex-1.svg';

import Hexagon from '../svg/Hexagon';


export default function Widget( { pushColor, activeUser, incrementClickCounter } ) {
    
    const widget = useRef();
    const uid = null;
    const [play] = useSound(boom);

    // const grow = anime({
    //   targets: '.ball',
    //   scale: [1, .85],
    //   duration: 300,
    //   autoplay: false,
    // });

    function handleMouseDown(e) {
      e.preventDefault();
      incrementClickCounter();
      // play();
      // grow.restart();
      // pushColor();
    }

    useEffect(() => {
      // setDefaultPosition();
    }, [])


    return (
			<Draggable
				// axis="x"
				// bounds='parent'
				// handle=".handle"
				// defaultPosition={{x: 0, y: 0}}
				// position={null}
				// grid={[125, 125]}
				// scale={1}
				onMouseDown={handleMouseDown}
				// onStart={handleStart}
				// onDrag={handleDrag}
				// onStop={handleStop}
			>
				<div className='widget' ref={widget}>
					{/* <img src={Hex} alt='hexagon' draggable="false"/> */}

          <Hexagon />

					<div class='user-name'>{activeUser.name}</div>
				</div>
			</Draggable>
		);
    

};
