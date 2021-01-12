import React from 'react';
import './index.scss';

export const Button = ({ children, type = 'submit', onClick }) => (
    <button className="button button--primary" type={type} onClick={onClick}>{children}</button>
);