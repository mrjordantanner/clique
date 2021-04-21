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
                        <>
                            <li><Link className='nav-link' to='/'>C L I Q U E</Link></li>
                            <li>Logged in as ( <Link className='nav-link' to='/profile' >{activeUser.name}</Link>  )</li>
                            <li><Link className='nav-link' to='/' onClick={handleLogout}>Log out</Link></li>
                        </>
                    }



                </ul>
            </div>
        </div>
    )
}
//#endregion