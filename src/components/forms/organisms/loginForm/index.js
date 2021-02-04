import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import './index.scss';
import {NavLink, useHistory, Link } from "react-router-dom";
import { LinkWrapper } from "../../molecules/linkWrapper";
import { AuthContext, useAuthState } from "../../../../context/authContextProvider";
import { ReactComponent as Spinner } from '../../../../assets/images/refresh.svg';
import axios from 'axios';


export const LoginForm = () => {
    const { register, handleSubmit, ...methods } = useForm({
        mode: 'onChange'
    });

    // context-functies
    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();

    // state voor gebruikersfeedback
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    // react-router dingen
    const history = useHistory();

    // Deze functie wordt elke keer afgevuurd als isAuthenticated (uit context) veranderd
    useEffect(() => {
        // als hij de waarde true heeft, DAN sturen we de gebruiker door!
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

            // We roepen hier de context-functie "login" aan. De context gaat dan met de data die we hebben
            // teruggekregen alles op de juiste manier in localstorage en state zetten!
            login(response.data);
        } catch(e) {
            // Gaat het mis? Log het in de console!
            console.error(e);
            setError('Inloggen is mislukt');
            // Tip: als de gebruikersnaam niet bestaat of wachtwoord is verkeerd, stuurt de backend een 401!
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

