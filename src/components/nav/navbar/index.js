import './index.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { RightNav } from "../rightnav";
import { NavBurger } from "../navburger";

export const NavBar = () => (
 <nav className='navbar'>
     <div className='navbar-container'>
         <NavLink to="/" exact activeClassName="nav-link--active" className="nav-link">Thinkbox</NavLink>
         <NavBurger/>
     </div>
 </nav>

);