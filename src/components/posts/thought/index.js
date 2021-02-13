import React from 'react';
import './index.scss';

export const Thought = ({title, description}) => {

    return(
        <div className="post__card thought">
            <div className="thought__top">
                <p className="post__title">{title}</p>
                <p className="post__des">{description}</p>
            </div>
            <p className="post__label">Thought</p>
        </div>
    );
}
