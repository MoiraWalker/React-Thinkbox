import './index.scss';
import { useState} from "react";
import { Button } from "../../components/forms/atoms/button";
import { ButtonWrapper } from "../../components/forms/molecules/buttonWrapper";


export const Account = () => {
    const [ edit, toggleEdit ] = useState(false);

    return(
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">User name</h1>
                { !edit ? (
                        <div className="account">
                            <div className="account__data">
                                <div className="account__item">
                                    <p className="account__label">Username</p>
                                    <p className="account__info">MoiraWalker</p>
                                </div>
                                <div className="account__item">
                                    <p className="account__label">Email</p>
                                    <p className="account__info">moira.walker@test.nl</p>
                                </div>
                            </div>
                            <div className="account__edit-wrapper">
                                <div className="account__edit">Edit account</div>
                                <div className="account__edit">Change password</div>
                            </div>
                                <Button className="button button__primary account__button-wrapper">Log out</Button>
                        </div>
                ) : (
                    <h2>editted account</h2>
                ) }
            </div>
        </div>
    );
};
