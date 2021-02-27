import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const AccountChangePasswordForm = ({setActiveComponent, id}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    const onError = (errorList) => {
        console.log(errorList)
    }

    async function updateAccount(data) {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.put(`http://localhost:8080/users/${id}`, data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        }
                    });
            setActiveComponent(false);
        } catch (error) {
            console.error(error);
        }
    }

    const onCancel = () => {
        setActiveComponent('show');
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(updateAccount, onError)}>
                <div className='form-item'>
                    <InputField
                        className="label--light"
                        name="password"
                        label="Password"
                        type="password"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'password is required',
                            }
                        })}
                    />
                </div>
                <div className='form-item'>
                    <InputField
                        className="label--light"
                        name="repeat-password"
                        label="Repeat password"
                        type="password"
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
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
            </form>
        </FormProvider>
    );
}


