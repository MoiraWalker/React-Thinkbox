import React from 'react';
import './index.scss';

export const Work = ({title}) => {

    return(
        <div className="post__card work">
            <p className="post__title">{title}</p>
        </div>
    );
}
