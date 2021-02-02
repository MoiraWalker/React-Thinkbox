import React from 'react';
import './index.scss';

export const Label = ({children, name, className="label--dark"}) => (
    <label
    className={className}
    htmlFor={name}>
        {children}
    </label>
);
