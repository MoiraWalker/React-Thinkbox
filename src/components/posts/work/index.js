import React from 'react';
import './index.scss';

export const Work = ({title}) => {

    return(
        <div className="post__card work">
            <div className="work__top">
                <p className="post__title">{title}</p>
            </div>
            <p className="post__label">Work</p>
        </div>
    );
}
