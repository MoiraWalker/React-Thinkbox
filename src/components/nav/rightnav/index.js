import './index.scss';
import {NavLink} from "react-router-dom";
import { BurgerBarContext } from "../../../context/burgerBarContextProvider";
import { useContext } from 'react';


export const RightNav = () => {
    const { open, setOpen } = useContext(BurgerBarContext);

    const rightNavStyle = {
        transform: open ? 'translateX(100%)' : 'translateX(0)',
        transition: '0.5s',
        transitionTiming: 'ease-out',
    };

    return(
        <ul style={rightNavStyle} className="nav-list">
            <li><NavLink to="/" exact activeClassName="nav-link--active" className="nav-link">Projects</NavLink></li>
            <li><NavLink to="/user" exact activeClassName="nav-link--active" className="nav-link nav-link-padding">Moira</NavLink></li>
            <li><NavLink to="/user" exact activeClassName="nav-link--active" className="nav-link test">Test</NavLink></li>
        </ul>
    );
};