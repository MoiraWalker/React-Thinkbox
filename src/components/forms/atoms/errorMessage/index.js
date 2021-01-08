import React from 'react';
import './index.scss';

export const ErrorMessage = ({ children }) => (
    <p className="error-message">
        {children}
    </p>
)