import './index.scss';
import { User } from "../../components/user/user";
import {useEffect, useState} from "react";
import axios from "axios";

export const Admin = () => {
    // axios
    const [clients, setClients] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [isDeleted, setIsDeleted ] = useState(null);

    useEffect(() => {
        getAllClients();
    }, [])

    useEffect(() => {
        if (isDeleted) {
            getAllClients();
            setIsDeleted(null);
        }
        console.log(isDeleted);
    }, [isDeleted])


    async function getAllClients() {
        try {
            const result = await axios.get(`http://localhost:8080/clients`);
            setClients(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateUser() {
        try {
            const result = await axios.put(`http://localhost:8080/clients`, {firstName: "test"});
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Admin</h1>
                {clients &&
                <div className='user__container'>
                    {
                        clients.map((client) => {
                            return <User isDeleted={setIsDeleted} key={client.email} firstName={client.firstName} lastName={client.lastName} email={client.email} id={client.id}></User>
                        })
                    }
                </div>
                }
            </div>
        </div>
    );
};
