import React from 'react';
import {Label} from '../../atoms';
import './index.scss';

export const SelectBox = ({label, name, fieldRef, id, children, value, onChange, className}) => {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <select
                name={name}
                id={id}
                ref={fieldRef}
                onChange={onChange}
                value={value}
                className={className}
            >{children}</select>
        </div>
    );
};


