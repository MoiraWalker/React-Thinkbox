import './index.scss';
import {useState} from "react";
import {AccountEditForm} from "../../components/forms/organisms/accountEditForm";
import {AccountInfo} from "../../components/accountInfo";
import {AccountChangePasswordForm} from "../../components/forms/organisms/accountChangePasswordForm";

export const Account = () => {
    const [activeComponent, setActiveComponent] = useState('show');

    const renderActiveComponent = () => {
        const components = {
            show: <AccountInfo setActiveComponent={setActiveComponent}/>,
            edit: <AccountEditForm  setActiveComponent={setActiveComponent}/>,
            password: <AccountChangePasswordForm setActiveComponent={setActiveComponent}/>,
        }
        return components[activeComponent]
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">User name</h1>
                <div className="account__wrapper">
                    { renderActiveComponent() }
                </div>
            </div>
        </div>
    );
};
