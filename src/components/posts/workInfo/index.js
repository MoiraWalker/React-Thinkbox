import React from 'react';
import './index.scss';

export const WorkInfo = ({title}) => {

    return(
        <div className="post__card post__info work">
            <div className="work__top">
                <p className="post__title">{title}</p>
            </div>
            <p className="post__label">Work</p>
        </div>
    );
}
