import './index.scss';
import React, {useContext} from 'react';
import {Button} from "../forms/atoms/button";
import {AuthContext, useAuthState} from "../../context/authContextProvider";


export const AccountInfo = ({setActiveComponent, username, email}) => {
    const {logout} = useContext(AuthContext);

    const editUser = () => {
        setActiveComponent('edit');
    }

    const changePassword = () => {
        setActiveComponent('password');
    }

    return (
        <div className="account">
            <div className="account__data">
                <div className="account__item">
                    <p className="account__label">Username</p>
                    <p className="account__info">{username}</p>
                </div>
                <div className="account__item">
                    <p className="account__label">Email</p>
                    <p className="account__info">{email}</p>
                </div>
            </div>
            <div className="account__edit-wrapper">
                <div className="account__edit" onClick={editUser}>Edit email</div>
                <div className="account__edit" onClick={changePassword}>Change password</div>
            </div>
            <Button type='button' onClick={() => logout()} className="button button__primary account__button-wrapper">Log out</Button>
        </div>
    );
}



