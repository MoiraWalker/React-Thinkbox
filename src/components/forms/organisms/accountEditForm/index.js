import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";
import {useAuthState} from "../../../../context/authContextProvider";

export const AccountEditForm = ({setIsUpdated, setActiveComponent, username, email, id}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        defaultValues: {email: email},
        mode: 'onChange'
    });
    const {user} = useAuthState();

    async function updateAccount(data) {
        try {
            const token = localStorage.getItem('token');
            const formData = {...data, username: username, password: token};
            console.log("formdata", formData);
            const response = await axios.put(`http://localhost:8080/api/users/email/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("response update", response);
            setActiveComponent('show');
            setIsUpdated(true);
        } catch (e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        setActiveComponent('show');
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

    return (
        <div>
            <div className="account__item">
                <p className="account__label">Username</p>
                <p className="account__info">{username}</p>
            </div>
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(updateAccount, onError)}>
                    <div className='form-item top'>
                        <InputField
                            className="label--light"
                            name="email"
                            label="Email"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Email name is required',
                                },
                            })}
                        />
                    </div>
                    <ButtonWrapper>
                        <Button onClick={updateAccount} className="button button__primary button__margin-right">Save
                            Changes</Button>
                        <Button type="button" className="button button__tertairy" onClick={onCancel}>Cancel</Button>
                    </ButtonWrapper>
                </form>
            </FormProvider>
        </div>

    );
}


