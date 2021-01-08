import React from 'react';
import { Label, SelectOption  } from '../../atoms';
import './index.scss';


export const SelectBox = ({ label, name, fieldRef, id, children }) => {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <select
                name={name}
                id={id}
                ref={fieldRef}
            >{children}</select>
        </div>
    );
};


