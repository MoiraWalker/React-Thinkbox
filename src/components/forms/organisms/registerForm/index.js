import React from 'react';
import {ButtonWrapper, InputField, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState} from 'react';
import './index.scss';
import {useHistory} from "react-router-dom";
import axios from "axios";


export const RegisterForm = () => {
    const {register, unregister, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [createUserSuccess, setCreateUserSuccess] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    let history = useHistory();

    async function onSubmit(data) {
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', data);
            console.log(response.data);

            if (response.status === 200) {
                setCreateUserSuccess(true);
            }
        } catch (e) {
            console.error(e);
            if (e.message.includes('400')) {
                setError('Er bestaat al een account met deze gebruikersnaam');
            } else {
                setError('Er is iets misgegaan bij het verzenden. Probeer het opnieuw');
            }
        }
    }


    return (
        <div>
            <FormProvider {...methods} register={register} handleSubmit={handleSubmit}>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-wrapper">
                            <h2>Register</h2>
                            <div className='form-item'>
                                <InputField
                                    name="username"
                                    label="Username"
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
                            {error && <p>{error}</p>}
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


