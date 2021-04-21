import React, { useEffect, useState } from 'react';

export default function MessageInput( { channel, handleSendMessage } ) {

    const [formValue, setFormValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await messagesRef.add({
        //   text: formValue,
        //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //   uid,
        //   photoURL
        // })
        handleSendMessage(channel._id, formValue);
        setFormValue('');
        // dummy.current.scrollIntoView(); //{ behavior: 'smooth' }
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
