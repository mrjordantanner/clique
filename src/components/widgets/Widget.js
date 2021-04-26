import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import anime from 'animejs';
import useSound from 'use-sound';
import boom from '../../audio/808_Soft.wav';
import { useDrag } from 'react-dnd';

export default function Widget( { getWidgetData, pushColor } ) {
    
    const widget = useRef();
    const uid = null;
    const [play] = useSound(boom);

    const grow = anime({
      targets: '.ball',
      scale: [1, .85],
      duration: 300,
      autoplay: false,
    });

    const name = 'widget';

    function handleMouseDown(e) {
      e.preventDefault();
      // play();
      // grow.restart();
      // pushColor();
      // console.log('mouseDown on widget');
    }



  // Get and emit widget position and size
  // function sendWidgetData() {

    // const widgetData = {
    //   x: widget.current.getClientRects()[0].x,
    //   y: widget.current.getClientRects()[0].y,
    //   width: widget.current.getClientRects()[0].width,
    //   height: widget.current.getClientRects()[0].height
    // }

    // console.log(`x:${widgetData.x}, y:${widgetData.y}`);

    // setInterval(() => {
    //   socket.emit('update-widget', { widgetData });
    //   // console.log(`x:${widgetData.x}, y:${widgetData.y}`);
    // }, 100);



  // }
  

  




  //   const ItemTypes = {
  //     BOX: 'box',
  //   }

  //   const style = {
  //     cursor: 'pointer',
  //   };

  //   const [{ isDragging }, drag] = useDrag(() => ({
  //     type: ItemTypes.BOX,
  //     item: { name },
  //     end: (item, monitor) => {
  //         const dropResult = monitor.getDropResult();
  //         if (item && dropResult) {
  //             alert(`You dropped ${item.name} into ${dropResult.name}!`);
  //         }
  //     },
  //     collect: (monitor) => ({
  //         isDragging: monitor.isDragging(),
  //         handlerId: monitor.getHandlerId(),
  //     }),
  // }));

  // const opacity = isDragging ? 0.4 : 1;




    return(
      <Draggable
        bounds='parent'
        onMouseDown={handleMouseDown}
        // onDrag={sendWidgetData}
        >
          <div className='widget' id='draggable' ref={widget}>
            <div className='hexagon'></div>
          </div>
      </Draggable>

      // <div className='hexagon' ref={drag} role="Box" style={{ ...style, opacity }} data-testid={`box-${name}`}></div>



    )
    
}
