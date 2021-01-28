import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState, useEffect} from 'react';
import './index.scss';
import {useHistory} from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const onError = (errorList) => {
        console.log(errorList)
    }

    let history = useHistory();

    function onSucces(data) {
        try {
            const result = axios.post(`http://localhost:8080/clients`, data);
            setSubmitSuccess(true);
            console.log("data", data);
            history.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <div>
                <form onSubmit={handleSubmit(onSucces, onError)}>
                    <div className="form-wrapper">
                        <h2>Register</h2>
                        <div className='form-item'>
                            <InputField
                                name="firstName"
                                label="First name"
                                type="text"
                                fieldRef={register({
                                    required: {
                                        value: true,
                                        message: 'First name is required',
                                    }
                                })}
                            />
                        </div>
                        <div className='form-item'>
                            <InputField
                                name="lastName"
                                label="Last name"
                                type="text"
                                fieldRef={register({
                                    required: {
                                        value: true,
                                        message: 'Last name is required',
                                    }
                                })}
                            />
                        </div>
                        <div className='form-item'>
                            <InputField
                                name="email"
                                label="Email"
                                type="text"
                                fieldRef={register({
                                    required: {
                                        value: true,
                                        message: 'Email name is required',
                                    },
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'The given email adress is not valid'
                                    }
                                })}
                            />
                        </div>
                        <div className='form-item'>
                            <InputField
                                name="password"
                                label="Password"
                                type="password"
                                fieldRef={register({
                                    required: {
                                        value: true,
                                        message: 'Password name is required',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/,
                                        message: 'Password is not strong enough. Password should contain, special character, capital letter, number and have a minimum length of 8 characters.'
                                    }
                                })}
                            />
                        </div>
                        <ButtonWrapper>
                            <Button>Create account</Button>
                        </ButtonWrapper>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}


