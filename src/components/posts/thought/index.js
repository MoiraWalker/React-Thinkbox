import React from 'react';
import './index.scss';

export const Thought = ({title}) => {

    return(
        <div className="post__card thought">
            <p className="post__title">{title}</p>
        </div>
    );
}
