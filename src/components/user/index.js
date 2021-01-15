import './index.scss';
import React from 'react';
import axios from "axios";

export const User = ( client ) => {

    async function deleteUser(id) {
        try {
            console.log('client id ', client.id);
            console.log('client id ', client);
            const result = await axios.delete(`http://localhost:8080/clients/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user__card">
            <h2>{client.firstName +" "+ client.lastName}</h2>
            <p>{client[0]}</p>
            <div className="user__button-wrapper">
                <button  onClick={() => deleteUser(client.id)}>x</button>
                <button>E</button>
            </div>
        </div>
    );
}



