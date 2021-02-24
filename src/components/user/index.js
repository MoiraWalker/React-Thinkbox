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
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8080/api/users/${id}`,{
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

    const editUser = () => {
        toggleEdit(true);
    }

    return (
        <div className="user__card">
            { edit ? (
             <UserEditForm id={id}  username={username} email={email} setIsUpdated={setIsUpdated} toggleEdit={toggleEdit}/>
            ) : (
                <div className="user__background">
                    <div className="user__header">
                        <h2>{username}</h2>
                        <div className="user__button-wrapper">
                            <button className="button__icon" onClick={() => deleteUser(id)}>
                                <Delete/>
                            </button>
                            <button className="button__icon" onClick={editUser}>
                                <Edit/>
                            </button>
                        </div>
                    </div>
                    <p>{email}</p>
                </div>
                )
            }
        </div>
    );
}



