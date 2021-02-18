import './index.scss';
import { User } from "../../components/user";
import { useEffect, useState } from "react";
import axios from "axios";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isDeleted, setIsDeleted] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        if (isDeleted) {
            getAllUsers();
            setIsDeleted(null);
        }
    }, [isDeleted])

    useEffect(() => {
        if (isUpdated) {
            getAllUsers();
            setIsUpdated(null);
        }
    }, [isUpdated])

    async function getAllUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Admin</h1>
                {users &&
                <div className='page__items'>
                    {
                        users.map((user) => {
                            return <User setIsUpdated={setIsUpdated} setIsDeleted={setIsDeleted} key={user.email}
                                         username={user.username} email={user.email}
                                         id={user.id}></User>
                        })
                    }
                </div>
                }
            </div>
        </div>
    );
};
