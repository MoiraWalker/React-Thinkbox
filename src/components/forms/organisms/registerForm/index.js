import React from 'react';
import {ButtonWrapper, InputField, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState, useEffect} from 'react';
import './index.scss';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AccountInfo} from "../../../accountInfo";
import {AccountEditForm} from "../accountEditForm";
import {AccountChangePasswordForm} from "../accountChangePasswordForm";

export const RegisterForm = () => {
    const {register, unregister, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [createUserSuccess, setCreateUserSuccess] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    let history = useHistory();

    function onSuccess(data) {
        const roles = {
            user: ['user'],
            admin: ['user', 'admin']
        }
        const formData = {...data, role: roles[data.role]};

        try {
            const result = axios.post(`http://localhost:8080/api/auth/signup`, formData);
            setSubmitSuccess(true);
            console.log("data sign up", data);
            history.push("/login");

            if (result.status === 200) {
                setCreateUserSuccess(true);
            } else if (result.status === 401) {
                console.log("401");
            }
            if (data.userName == "") {
                console.log("empty!");
            }

        } catch (error) {
            console.error(error);
        }
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

    return (
        <div>
            <FormProvider {...methods} register={register} handleSubmit={handleSubmit}>
                <div>
                    <form onSubmit={handleSubmit(onSuccess, onError)}>
                        <div className="form-wrapper">
                            <h2>Register</h2>
                            <div className='form-item'>
                                <InputField
                                    name="username"
                                    label="userName"
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
                                            // value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/,
                                            value: true,
                                            message: 'Password is not strong enough. Password should contain, special character, capital letter, number and have a minimum length of 8 characters.'
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-item">
                                <SelectBox
                                    name="role"
                                    label="role"
                                    id="role"
                                    fieldRef={register({
                                        required: {
                                            value: true,
                                            message: 'Last name is required',
                                        }
                                    })}
                                >
                                    <SelectOption name="role">User</SelectOption>
                                    <SelectOption name="role">Admin</SelectOption>
                                </SelectBox>
                            </div>
                            <ButtonWrapper>
                                <Button>Create account</Button>
                            </ButtonWrapper>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </div>
    );
}


