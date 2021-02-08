import './index.scss';
import {useState, useEffect } from "react";
import {AccountEditForm} from "../../components/forms/organisms/accountEditForm";
import {AccountInfo } from "../../components/accountInfo";
import {AccountChangePasswordForm} from "../../components/forms/organisms/accountChangePasswordForm";
import { useAuthState } from "../../context/authContextProvider";
import axios  from "axios";

export const Account = () => {
    const [activeComponent, setActiveComponent] = useState('show');
    const { user } = useAuthState();
    const [protectedData, setProtectedData] = useState('');

    useEffect(() => {
        async function getProtectedData() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setProtectedData(response.data);
            } catch(e) {
                console.log(e);
            }
        }
        getProtectedData();
    }, []);

    const renderActiveComponent = () => {
        const components = {
            show: <AccountInfo username={user.username} email={user.email} setActiveComponent={setActiveComponent}/>,
            edit: <AccountEditForm username={user.username} email={user.email} setActiveComponent={setActiveComponent}/>,
            password: <AccountChangePasswordForm username={user.username} email={user.email} setActiveComponent={setActiveComponent}/>,
        }
        return components[activeComponent]
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Account</h1>
                <div className="account__wrapper">
                    { renderActiveComponent() }
                </div>
            </div>
        </div>
    );
};
