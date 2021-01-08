import './index.scss';
import React, { useState } from 'react';
import { NavList } from "../navList";
import { BurgerBarContext } from "../../../context/burgerBarContextProvider";
import { useContext } from 'react';

export const NavBurger = () => {
    const { open, setOpen } = useContext(BurgerBarContext);

    return(
        <>
            <div className="burger" open={open} onClick={() => setOpen(!open)}>
                <div className={open ? 'burger-bar burger-bar-top--open' : 'burger-bar burger-bar-top--closed' }  ></div>
                <div className={open ? 'burger-bar burger-bar-middle--open' : 'burger-bar burger-bar-middle--closed' }  ></div>
                <div className={open ? 'burger-bar burger-bar-bottom--open' : 'burger-bar burger-bar-bottom--closed' }  ></div>
            </div>
            <NavList open={setOpen} />
        </>
    );
};