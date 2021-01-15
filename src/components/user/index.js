import './index.scss';
import React from 'react';
import axios from "axios";

export const User = ({ id, email, isDeleted, firstName, lastName  })  => {


    // async function getAllClients() {
    //     try {
    //         const result = await axios.get(`http://localhost:8080/clients`);
    //         console.log('axios result: ', result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function deleteUser(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/clients/${id}`);
            isDeleted(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user__card">
            <h2>{firstName +" "+ lastName}</h2>
            <p>{email}</p>
            <div className="user__button-wrapper">
                <button  onClick={() => deleteUser(id)}>x</button>
                <button>E</button>
            </div>
        </div>
    );
}



