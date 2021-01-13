import './index.scss';
import React from 'react';

export const User = ( client ) => {
    return (
        <div className="user__card">
            <h2>{client.firstName +" "+ client.lastName}</h2>
            <p>{client.email}</p>
            <div className="user__button-wrapper">
                <button>X</button>
                <button>E</button>
            </div>
        </div>
    );
}


export const Button = ({ children, type = 'submit', onClick }) => (
    <button className="button button--primary" type={type} onClick={onClick}>{children}</button>
);