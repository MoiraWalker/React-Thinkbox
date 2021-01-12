import './index.scss';
import {NavLink} from "react-router-dom";
import { BurgerBarContext } from "../../../context/burgerBarContextProvider";
import { useContext } from 'react';


export const NavList = () => {
    const { open, setOpen } = useContext(BurgerBarContext);

    return(
        <ul className={open ? 'nav-list nav-list--open' : 'nav-list nav-list--closed'} >
            <li><NavLink to="/admin" exact activeClassName="nav-link--active" className="nav-link nav-link-padding">Admin</NavLink></li>
            <li><NavLink to="/" exact activeClassName="nav-link--active" className="nav-link">Projects</NavLink></li>
            <li><NavLink to="/user" exact activeClassName="nav-link--active" className="nav-link nav-link-padding">Moira</NavLink></li>
            <li><NavLink to="/user" exact activeClassName="nav-link--active" className="nav-link test">Test</NavLink></li>
        </ul>
    );
};