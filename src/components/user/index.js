import './index.scss';
import React, { useState } from 'react';
import axios from "axios";
import { UserEditForm } from "../forms/organisms/userEditForm";
import { ReactComponent as Delete } from '../../assets/images/delete.svg';
import { ReactComponent as Edit } from '../../assets/images/edit.svg';

export const User = ({ id, email, setIsDeleted, setIsUpdated, username  })  => {
    const [ edit, toggleEdit ] = useState(false);

    async function deleteUser(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/api/users/${id}`);
            setIsDeleted(id);
        } catch (error) {
            console.error(error);
        }
    }

    const editUser = () => {
        toggleEdit(true);
    }

    return (
        <div className="user__card">
            { edit ? (
             <UserEditForm id={id}  username={username} email={email} setIsUpdated={setIsUpdated} toggleEdit={toggleEdit}/>
            ) : (
                <div>
                    <h2>{username}</h2>
                    <p>{email}</p>
                    <div className="user__button-wrapper">
                        <button className="button__icon" onClick={() => deleteUser(id)}>
                            <Delete/>
                        </button>
                        <button className="button__icon" onClick={editUser}>
                            <Edit/>
                        </button>
                    </div>
                </div>
                )
            }
        </div>
    );
}



