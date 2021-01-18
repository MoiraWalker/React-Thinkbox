import './index.scss';
import { User } from "../../components/user";
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

    console.log(clients);

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
