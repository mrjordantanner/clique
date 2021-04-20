import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar( { handleLogout, activeUser } ) {

    return (
     //#region [Violet]
        <div className='navbar-container'>
            <div className='navbar'>
                {/* <div className='navbar-stripe'></div> */}
                <ul>
                    <li><Link className='nav-link' to='/chat'>C L I Q U E</Link></li>
                    
                    {activeUser ?
                        <li><Link className='nav-link' to='/login' onClick={handleLogout}>Log out</Link></li> :
                        <li><Link className='nav-link' to='/login'>login</Link></li>}

                    <li>{activeUser}</li>
                </ul>
            </div>
        </div>
    )
}
//#endregion