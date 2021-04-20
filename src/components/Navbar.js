import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

export default function Navbar( { handleLogout } ) {

    return (
     //#region [Violet]
     <div className='navbar-container'>
        <div className='navbar'>
            {/* <div className='navbar-stripe'></div> */}
            <ul>
                <li><Link className='nav-link' to='/'>C L I Q U E</Link></li>
                <li><Link className='nav-link' to='/login'>login</Link></li>
                <li><Link className='nav-link' to='/login' onClick={handleLogout}>Log out</Link></li>
            </ul>
        </div>
        </div>
    )
}
//#endregion