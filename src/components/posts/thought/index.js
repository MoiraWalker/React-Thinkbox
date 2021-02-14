import React from 'react';
import './index.scss';
import close from '../../../assets/images/close.svg';
import { useHistory } from 'react-router-dom';

export const Thought = ({title, description}) => {

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    return(
        <div className="post__card thought">
            <div className="thought__top">
                <div className="post__header">
                    <p className="post__title">{title}</p>
                    <img onClick={back} src={close} alt="close" className="close" />
                </div>
                <p className="post__des">{description}</p>
            </div>
            <p className="post__label">Thought</p>
        </div>
    );
}
