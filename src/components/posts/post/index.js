import React from 'react';
import './index.scss';

export const Post = ({title}) => {

    return(
        <div className="post__card">
            <p className="post__title">{title}</p>
        </div>
    );
}
