import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { auth } from '../../../firebase/firebase.config';
import { BsFillCartFill } from "react-icons/bs";
import UseCart from '../../../Hooks/UseCart';
import UseAdmin from '../../../Hooks/UseAdmin';
const Navbar = () => {

  const{user,logOut} = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [cart] = UseCart();

  const handleSignOut = ()=>{
    logOut(auth)
    .then(()=>{
      alert('logout successfully')
    })
    .catch(error=>{
      console.log(error)
    })

  }

    const links = <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/menu'>Menu</Link></li>
      <li><Link to='/order/salad'>Order Food</Link></li>
      {
        user && isAdmin && <li><Link to='/dashboard/adminHome'>DashBoard</Link></li>

     }
      {
        user && !isAdmin && <li><Link to='/dashboard/userHome'>DashBoard</Link></li>

      }
      <li><Link to='/dashboard/cart'>
      <button className="btn">
      <BsFillCartFill className='mr-2'/>
      <div className="badge badge-secondary">{cart.length}</div>
     </button>
      </Link></li>
     {
      user? <>
      <span>{user?.displayName}</span>
      <button onClick={handleSignOut} className='btn btn-ghost'>Logout</button>
      </> :  <> <li><Link to='/login'>Login</Link></li>    </>
   
     
     
     }
     
    </>
    return (
        <div className="navbar fixed z-10 max-w-screen-xl bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            
             {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
     
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    );
};

export default Navbar;