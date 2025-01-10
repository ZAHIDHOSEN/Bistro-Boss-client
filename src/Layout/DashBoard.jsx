import React from 'react';
import { FaAd, FaBook, FaCalendarWeek, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail } from 'react-icons/fa';
import { FaBookAtlas } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import UseCart from '../Hooks/UseCart';
import UseAdmin from '../Hooks/UseAdmin';

const DashBoard = () => {
    const [cart] = UseCart();

    // Todo: get isAdmin value from the database

     const [isAdmin]= UseAdmin();
     
    return (
        <div className='flex'>
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu '>

                    {
                        isAdmin ? <>

<li>
                        
                        <NavLink to="/dashboard/adminHome">
                        <FaHome></FaHome>
                        Admin Home</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/addItem">
                       <FaUtensils></FaUtensils>
                        AddItems</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/manageItems">
                       <FaList></FaList>
                        Manage items</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/bookings">
                         <FaBook></FaBook>
                        Manage Bookings</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/users">
                        <FaUser></FaUser>
                       All Users</NavLink>
                        </li>

                        </>
                        :
                        <>
                        <li>
                        
                        <NavLink to="/dashboard/userHome">
                        <FaHome></FaHome>
                        My Home</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/reservation">
                        <FaCalendarWeek></FaCalendarWeek>
                        Reservation</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/cart">
                        <FaShoppingCart></FaShoppingCart>
                        My Cart({cart.length})</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/review">
                         <FaAd></FaAd>
                        Review</NavLink>
                        </li>
                    <li>
                        
                        <NavLink to="/dashboard/paymentHistory">
                        <FaBookAtlas></FaBookAtlas>
                       Payment History</NavLink>
                        </li>

                        </>
                    }
                    

                        {/* shared nav links */}
                        <div className='divider'></div>

                        <li>
                        
                        <NavLink to="/">
                        <FaHome></FaHome>
                         Home</NavLink>
                        </li>
                    
                        <li>
                        
                        <NavLink to="/menu">
                        <FaSearch></FaSearch>
                    
                         menu</NavLink>
                        </li>
                        <li>
                        
                        <NavLink to="/menu">
                        <FaEnvelope></FaEnvelope>
                    
                         contact</NavLink>
                        </li>
                    

                </ul>

            </div>
            {/* dash board content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;