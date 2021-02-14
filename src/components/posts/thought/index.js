import React from 'react';
import './index.scss';
import close from '../../../assets/images/close.svg';
import {ReactComponent as Delete} from "../../../assets/images/delete.svg";
import {ReactComponent as Edit} from "../../../assets/images/edit.svg";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom';
import {ThoughtEditForm} from "../../forms/organisms/thoughtEditForm";

export const Thought = () => {
    const {id} = useParams();
    const [edit, toggleEdit] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [thought, setThought] = useState("");

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    useEffect(() => {
            getThought();
            setIsUpdated(false);
    }, [isUpdated])

    async function getThought() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts/thoughts/${id}`);
            setThought(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteThought(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/api/posts/thoughts/${id}`);
            back();
        } catch (e) {
            console.error(e);
        }
    }

    const editThought = () => {
        toggleEdit(true);
    }

    return (
        <div>
            {edit ?
                (<ThoughtEditForm id={id} setIsUpdated={setIsUpdated} toggleEdit={toggleEdit} title={thought.title} description={thought.description}></ThoughtEditForm>)
                :
                (<div className="post__card thought">
                    <div className="thought__top">
                        <div className="post__header">
                            <p className="post__title">{thought.title}</p>
                            <img onClick={back} src={close} alt="close" className="close"/>
                        </div>
                        <p className="post__des">{thought.description}</p>
                    </div>
                    <div className="post__footer">
                        <p className="post__label">Thought</p>
                        <div className="post__buttons">
                            <Delete className="button__icon" onClick={() => deleteThought(id)}/>
                            <Edit className="button__icon" onClick={editThought}/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}
