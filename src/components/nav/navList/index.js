import './index.scss';
import { NavLink } from "react-router-dom";
import { BurgerBarContext } from "../../../context/burgerBarContextProvider";
import { useContext } from 'react';
import { AuthContext, useAuthState } from "../../../context/authContextProvider";

export const NavList = () => {
    const {getAdmin} = useContext(AuthContext);
    const {isAuthenticated} = useAuthState();
    const { open, setOpen } = useContext(BurgerBarContext);
    const { user } = useAuthState();

    return(
        <ul className={open ? 'nav-list nav-list--open' : 'nav-list nav-list--closed'} >
            <li>{ getAdmin() &&  <NavLink to="/admin" exact activeClassName="nav-link--active" className="nav-link nav-link__padding nav-link--is-authorised">Admin</NavLink>}</li>
            <li>{ isAuthenticated &&  <NavLink to="/" exact activeClassName="nav-link--active" className="nav-link nav-link__padding">Projects</NavLink>}</li>
            <li>{ isAuthenticated && <NavLink to="/account" exact activeClassName="nav-link--active" className="nav-link nav-link__padding">Account</NavLink>}</li>
            <li><NavLink to="/account" exact activeClassName="nav-link--active" className="nav-link nav-link__logout">Logout</NavLink></li>
        </ul>
    );
};
