import React, { useEffect, useState } from 'react';

export default function MessageInput( { channel, handleSendMessage } ) {

    const [formValue, setFormValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSendMessage(channel._id, formValue);
        setFormValue('');
      }

    return (
			<div>
				<form className='messages-input' onSubmit={handleSubmit}>
					<input
						value={formValue}
						onChange={(e) => setFormValue(e.target.value)}
						placeholder='Enter message'
					/>

					<button type='submit' disabled={!formValue}>
						SEND
					</button>
				</form>
			</div>
		);
}
