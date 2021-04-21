import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar( { handleLogout, activeUser } ) {

    return (
     //#region [Violet]
        <div className='navbar-container'>
            <div className='navbar'>
                {/* <div className='navbar-stripe'></div> */}
                <ul>
                    {activeUser.token &&
                        <li><Link className='nav-link' to='/'>C L I Q U E</Link></li>}
                    
                    {activeUser.token ?
                        <li><Link className='nav-link' to='/login' onClick={handleLogout}>Log out</Link></li> :
                        <li><Link className='nav-link' to='/login'>login</Link></li>}

                    <li>{activeUser?.name}</li>
                </ul>
            </div>
        </div>
    )
}
//#endregion