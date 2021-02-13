import React from 'react';
import './index.scss';

export const Thought = ({title, description}) => {

    return(
        <div className="post__card thought">
            <p className="post__title">{title}</p>
            <p className="post__des">{description}</p>
        </div>
    );
}
