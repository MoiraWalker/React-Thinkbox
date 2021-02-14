import React from 'react';
import './index.scss';
import {ExternalLink} from "react-external-link";
import {useHistory} from 'react-router-dom';

export const WorkInfo = ({title, description, id, link}) => {
    const history = useHistory();

    const toPost = () => {
        history.push(`/post${id}`);
    }

    const workLink = link;

    const onLink = (workLink) => {
        if ( workLink === "" ) {
            return null
        } else {
            return <ExternalLink href={`https://${workLink}`} />;
        }
    }

    return(
        <div onClick={toPost} className="post__card post__info work__info">
            <div className="work__top">
                <p className="post__title">{title}</p>
                <p className="post__des">{description}</p>
                {onLink(workLink)}
            </div>
            <p className="post__label">Work</p>
        </div>
    );
}
