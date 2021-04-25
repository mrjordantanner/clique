import React from 'react';
import '../styles/loading.css';

// https://loading.io/css/
export default function Loading() {
	return (
		<div className='lds-spinner center'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
