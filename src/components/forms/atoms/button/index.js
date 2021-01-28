import React from 'react';
import './index.scss';

export const Button = ({ children, type = 'submit', onClick, className="button button__primary"}) => (
    <button className={className} type={type} onClick={onClick}>{children}</button>
);
