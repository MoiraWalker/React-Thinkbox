import React from 'react';
import './index.scss';

export const Thought = ({title}) => {

    return(
        <div className="thought__card">
            <p className="thought__title">{title}</p>
        </div>
    );
}
