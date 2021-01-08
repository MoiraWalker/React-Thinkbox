import React from 'react';
import './index.scss';

export const Label = ({children, name}) => (
    <label
    className='label'
    htmlFor={name}>
        {children}
    </label>
);