import './index.scss';
import React, {useState, useEffect} from 'react';
import {ReactComponent as Delete} from "../../assets/images/delete.svg";
import {ReactComponent as Edit} from "../../assets/images/edit.svg";
import axios from "axios";
import {ProjectEditForm} from "../forms/organisms/projectEditForm";
import {useHistory} from "react-router-dom";
import {Button} from "../forms/atoms/button";

export const ProjectInfo = ({id, setIsDeleted, title, privateView, setIsUpdated}) => {
    const [edit, toggleEdit] = useState(false);
    const [access, setAccess] = useState("Private");
    const history = useHistory();

    async function deleteProject(id) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8080/api/projects/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsDeleted(id);
        } catch (e) {
            console.log(e);
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

    const toProject = () => {
        history.push(`/project${id}`);
    }

    return (
        <div className="project__card">
            {edit ? (
                <ProjectEditForm title={title} id={id} toggleEdit={toggleEdit} setIsUpdated={setIsUpdated}
                                 setAccess={setAccess}/>
            ) : (
                <div>
                    <div className="project__align">
                        <h2>{title}</h2>
                        <div className="project__button-wrapper">
                            <button className="button__icon" onClick={() => deleteProject(id)}>
                                <Delete/>
                            </button>
                            <button className="button__icon" onClick={editProject}>
                                <Edit/>
                            </button>
                        </div>
                    </div>
                    <div className="project__align">
                        <p className="access">{access}</p>
                        <Button className="button button__tertairy" onClick={toProject}>Go to project</Button>
                    </div>
                </div>
            )}

        </div>
    );
}



