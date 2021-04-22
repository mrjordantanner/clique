import React, { useRef, useState, useEffect } from 'react';
import Widget from './widgets/Widget';
import '../styles/widgets.scss'

export default function WidgetView() {

    let Draggable = require('react-draggable');

		//   const widgetsRef = firestore.collection('widgets');
		//   const widgetQuery = widgetsRef.orderBy('createdAt').limit(50);
		//   const [widgets] = useCollectionData(widgetQuery, { idField: 'id' });

		//	TODO:
			// Save widgets in DB
			// every interval save/load widget data to/from firebase
		// for retrieving widgets

		// every interval send/receive/update widget data to from 


	const container = useRef();

	// BACKGROUND COLOR PUSH
	// on object click, bg color increments rgb value towards a target value
	// also, the bg color is constantly fading back to base value
	// const container = document.querySelector('#container');
	// const container = useRef();

	// // Arrays representing RGBA values
	// const baseColor = [0, 0, 0];
	// const targetColor = [0, 0, 255];

	// let frames = 0;
	// let running = false;

	// // compare the RGB values of baseColor and targetColor, decide
	// let rD = targetColor[0] - baseColor[0];
	// let gD = targetColor[1] - baseColor[1];
	// let bD = targetColor[2] - baseColor[2];

	// function getRGB() {
	//     let containerStyle = getComputedStyle(container.current);
	//     let rgb = containerStyle.backgroundColor;
	//     // Convert rgb string to an array
	//     rgb = rgb.substring(4, rgb.length-1)
	//          .replace(/ /g, '')
	//          .split(',');
	//     return rgb;
	// }

	// function changeRGB(rgb, amount) {
	//     // Change each RGB value by given amount
	//     for (let i = 0; i < rgb.length; i++) {
	//         let x = parseInt(rgb[i])
	//         x += amount[i];
	//         if (x > 255) {
	//             x = 255;
	//         }
	//         else if (x < 0) {
	//             x = 0;
	//         }
	//         rgb[i] = x;
	//     }
	// }

	// function applyTargetColor(rgb) {
	//     // assign rgb values to the container
	//     container.current.style.setProperty('--targetR', rgb[0]);
	//     container.current.style.setProperty('--targetG', rgb[1]);
	//     container.current.style.setProperty('--targetB', rgb[2]);
	//     //  container.style.setProperty('backgroundColor', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
	// }

	// // increment color towards target value
	// function pushColor() {
	//     const rgb = getRGB();
	//     changeRGB(rgb, [10, 10, 10]);
	//     applyTargetColor(rgb);
	// }

	// const revertColor = setInterval(() => {
	// 	// if (!auth.currentUser || !container.current) {
	// 	// 	return;
	// 	// }
	//     container.current.classList.add('bg-transition');
	//     running = true;
	//     frames++;

	//     const rgb = getRGB();
	//     changeRGB(rgb, [-1, -2, -3]);
	//     applyTargetColor(rgb);

	//     if (targetColor[0] === baseColor[0] && targetColor[1] === baseColor[1] && targetColor[2] === baseColor[2]) {
	//         clearInterval(revertColor);
	//         running = false;
	//         return;
	//     }
	// }, 50)



    return (
		<div className='wireframe'>
			<div className='widget-container' ref={container}>
				{/* <Widget pushColor={pushColor}/> 
			 */}
			 <Widget />

				{/* {widgets?.map((widget) => {
					return (
						<Widget key={widget.uid} />
					);
				})} */}

			</div>
		</div>
	);
}
