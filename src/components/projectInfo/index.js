import './index.scss';
import React, {useContext, useState, useEffect} from 'react';
import {ReactComponent as Delete} from "../../assets/images/delete.svg";
import {ReactComponent as Edit} from "../../assets/images/edit.svg";
import axios from "axios";
import { ProjectEditForm } from "../forms/organisms/projectEditForm";

export const ProjectInfo = ({id, setIsDeleted, title, privateView, setIsUpdated}) => {
    const [edit, toggleEdit] = useState(false);
    const [access, setAccess] = useState("Private");

    async function deleteProject(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/api/projects/${id}`);
            setIsDeleted(id);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (privateView === false) {
            setAccess('Private');
        } else {
            setAccess('Public');
        }
    }, [setAccess])

    const editProject = () => {
        toggleEdit(true);
    }

    return (
        <div className="user__card">
            {edit ? (
                <ProjectEditForm title={title} id={id} toggleEdit={toggleEdit} setIsUpdated={setIsUpdated} setAccess={setAccess}/>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <p>{access}</p>
                    <div className="user__button-wrapper">
                        <button className="button__icon" onClick={() => deleteProject(id)}>
                            <Delete/>
                        </button>
                        <button className="button__icon" onClick={editProject}>
                            <Edit/>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}



