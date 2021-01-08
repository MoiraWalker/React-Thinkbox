import './index.scss';
import React, { useState } from 'react';
import {RightNav} from "../rightnav";
import { BurgerBarContext } from "../../../context/burgerBarContextProvider";
import { useContext } from 'react';

export const NavBurger = () => {
    const { open, setOpen } = useContext(BurgerBarContext);


    const burgerBarStyle = {
        backgroundColor:  open ? 'black' : 'blue'
    };

    const rotateUpperStyle = {
        transform: open ?  'rotate(0deg)' : 'rotate(45deg)',
        transformOrigin: 'left bottom',
        transition: '0.5s',
        transitionTiming: 'ease-out'
    };

    const rotateMiddleStyle = {
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        opacity: open ? 1 : 0
    };

    const rotateLowerStyle = {
        transform: open ? 'rotate(0deg)' : 'rotate(-45deg)' ,
        transformOrigin: 'left top',
        transition: '0.5s',
        transitionTiming: 'ease-out'
    };


    return(
        <>
            <div className="burger" open={open} onClick={() => setOpen(!open)}>
                <div style={{...burgerBarStyle, ... rotateUpperStyle}}  className="burger-bar"></div>
                <div style={{...burgerBarStyle, ... rotateMiddleStyle}}  className="burger-bar"></div>
                <div style={{...burgerBarStyle, ... rotateLowerStyle}}  className="burger-bar"></div>
            </div>
            <RightNav open={setOpen} />
        </>
    );
};