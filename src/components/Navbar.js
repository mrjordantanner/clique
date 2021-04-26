import React from 'react'
import { Link } from 'react-router-dom';
import Hex from '../svg/hex-1.svg';

export default function Navbar( { handleLogout, activeUser } ) {

    return (
     //#region [Violet]
        <div className='nav-flex'>
            <div className='navbar'>
                <ul>
                    <li><Link className='nav-link nav-logo' to='/'>C L I Q U E</Link></li>
                    <li>by <a href='http://www.jordantanner.net/' target='_blank' className='nav-link' to='/'>@jtscodes</a></li>
                </ul>
            </div>
     
            <div className='navbar'>
                <ul>
                    {activeUser.token &&
                        <>
                            <li className='nav-username'><img src={Hex} alt='hexagon' draggable="false" className='nav-hex' />{activeUser.name}</li>
                            <li><Link className='nav-link' to='/' onClick={handleLogout}>Log out</Link></li>
                           
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}
//#endregion