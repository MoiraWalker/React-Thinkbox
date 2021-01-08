import React from 'react';
import './index.css';

export const SelectOption = ({children, name, value}) => (
    <option
        name={name}
        className="select-option"
        value={value}> {children}
    </option>
);