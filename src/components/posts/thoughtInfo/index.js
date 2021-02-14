import React from 'react';
import './index.scss';
import {useHistory} from "react-router-dom";

export const ThoughtInfo = ({id, title, description}) => {
    const history = useHistory();

    const toPost = () => {
        history.push(`/post${id}`);
    }

    return(
        <div onClick={toPost} className="post__card post__info thought-info">
            <div className="thought__top">
                <p className="post__title">{title}</p>
                <p className="post__des">{description}</p>
            </div>
            <p className="post__label">Thought</p>
        </div>
    );
}
