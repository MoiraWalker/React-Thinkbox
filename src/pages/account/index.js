import './index.scss';
import {useState, useEffect} from "react";
import {AccountEditForm} from "../../components/forms/organisms/accountEditForm";
import {AccountInfo} from "../../components/accountInfo";
import {AccountChangePasswordForm} from "../../components/forms/organisms/accountChangePasswordForm";
import {useAuthState} from "../../context/authContextProvider";
import axios from "axios";


export const Account = () => {
    const { isAuthenticated } = useAuthState();
    const [activeComponent, setActiveComponent] = useState('show');
    const {user} = useAuthState();
    const [isUpdated, setIsUpdated] = useState("");
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        setCurrentUser(user);
        console.log("user", user);
    },[]);



    useEffect(() => {
        if (isUpdated) {
            getUser();
            setIsUpdated(null);
        }
    }, [isUpdated])


    async function getUser() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/users/${user.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("response", response);
            setCurrentUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    const renderActiveComponent = () => {
        const components = {
            show: <AccountInfo username={currentUser.username} email={currentUser.email} setActiveComponent={setActiveComponent}/>,
            edit: <AccountEditForm username={currentUser.username} id={currentUser.id} password={user.password} setIsUpdated={setIsUpdated} username={currentUser.username} email={currentUser.email} setActiveComponent={setActiveComponent}/>,
            password: <AccountChangePasswordForm username={currentUser.username} email={currentUser.email} setActiveComponent={setActiveComponent}/>,
        }
        return components[activeComponent]
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Account</h1>
                <div className="account__wrapper">
                    { currentUser && renderActiveComponent()}
                </div>
            </div>
        </div>
    );
};
