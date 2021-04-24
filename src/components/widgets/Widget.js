import React, { useRef, useState, useEffect } from 'react';
// import 'firebase/database';
import Draggable from 'react-draggable';
import anime from 'animejs';
import useSound from 'use-sound';
import boom from '../../audio/808_Soft.wav';
import { useDrag } from 'react-dnd';

export default function Widget( { getWidgetData, pushColor } ) {
    
    const widget = useRef();
    const uid = null;
    // const database = firebase.database();
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
      // getWidgetData();
      // pushColor();
      // console.log('mouseDown on widget');
    }


  // Get and emit widget position and size
  // function getWidgetData() {
  //   const data = {
  //     x: widget.current.getClientRects()[0].x,
  //     y: widget.current.getClientRects()[0].y,
  //     width: widget.current.getClientRects()[0].width,
  //     height: widget.current.getClientRects()[0].height
  //   }
      // database.ref('users/' + auth.currentUser.uid).set({
      //     name: auth.currentUser.displayName.split(' ')[0],
      //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //     uid: auth.currentUser.uid,
      //     photoURL: auth.currentUser.photoURL
      //   });
      //   console.log('User data written')
  // }

 // Receive widget data and update position
  // socket.on('update_data', function (data) {


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
        onDrag={getWidgetData}>
          <div className='widget' id='draggable' ref={widget}>
            <div className='hexagon'></div>
          </div>
      </Draggable>

      // <div className='hexagon' ref={drag} role="Box" style={{ ...style, opacity }} data-testid={`box-${name}`}></div>



    )
    
}
