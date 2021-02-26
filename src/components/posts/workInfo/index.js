import React from 'react';
import './index.scss';
import {ExternalLink} from "react-external-link";
import {useHistory} from 'react-router-dom';

export const WorkInfo = ({title, image, description, id, link}) => {
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

    console.log("image inside work info", image);


    return(
        <div onClick={toPost} className="post__card post__info work__info">
            <div className="work__top">
                <p className="post__title">{title}</p>
                <p className="post__des">{description}</p>
                <img src={image} className="post__image"/>
                {onLink(workLink)}
            </div>
            <p className="post__label">Work</p>
        </div>
    );
}
