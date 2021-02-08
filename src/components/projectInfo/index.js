import './index.scss';
import React, {useContext, useState, useEffect} from 'react';
import {ReactComponent as Delete} from "../../assets/images/delete.svg";
import {ReactComponent as Edit} from "../../assets/images/edit.svg";
import axios from "axios";



export const ProjectInfo = ({ id, setIsDeleted, title, privateView }) => {
    const [ edit, toggleEdit ] = useState(false);
    const [ access, setAccess ] = useState("Private");

    async function deleteUser(id) {
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
    }, [])


    const editUser = () => {
        toggleEdit(true);
    }

    return (
        <div className="user__card">
                <div>
                    <h2>{title}</h2>
                    <p>{access}</p>
                    <div className="user__button-wrapper">
                        <button className="button__icon" onClick={() => deleteUser(id)}>
                            <Delete/>
                        </button>
                        <button className="button__icon" onClick={editUser}>
                            <Edit/>
                        </button>
                    </div>
                </div>
        </div>
    );
}



