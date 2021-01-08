import React, { createContext, useState } from 'react';

export const BurgerBarContext = createContext({});


const BurgerBarContextProvider = ({ children}) => {
    const [open, setOpen ]= useState(true);
    return (
        <BurgerBarContext.Provider value={{open, setOpen}}>
            {children}
        </BurgerBarContext.Provider>
    );
};

export default BurgerBarContextProvider;
