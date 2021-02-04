import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import './index.scss';
import {NavLink, useHistory, Link } from "react-router-dom";
import { LinkWrapper } from "../../molecules/linkWrapper";
import { AuthContext, useAuthState } from "../../../../context/authContextProvider";
import axios from 'axios';

export const LoginForm = () => {
    const { register, handleSubmit, ...methods } = useForm({ mode: 'onChange'});
    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated === true) {
            history.push('/home');
        }
    }, [isAuthenticated]);

    async function onSubmit(data) {
        toggleLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                username: data.userName,
                password: data.password,
            })
            login(response.data);
        } catch(e) {
            console.error(e);
            setError('Inloggen is mislukt');
        }
        toggleLoading(false);
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

 return (
     <FormProvider {...methods} register={register} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onSubmit, onError)}>
             <div className="form-wrapper">
             <h3>Login</h3>
             <div className='form-item'>
                 <InputField
                     name="userName"
                     label="User name"
                     type="text"
                     fieldRef={register({
                         required: {
                             value: true,
                             message: 'User name is required',
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
                             message: 'Password is required',
                         }
                     })}
                 >
                 </InputField>
             </div>
             <ButtonWrapper>
                 <Button type="submit">Submit</Button>
             </ButtonWrapper>
                 <LinkWrapper>
                    <NavLink to="/register" exact activeClassName="link--active" className="link">Create account</NavLink>
                 </LinkWrapper>
             </div>
         </form>
     </FormProvider>
 );
}

