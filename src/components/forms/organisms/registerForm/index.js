import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import './index.scss';
import { useHistory } from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
    const { register, unregister, watch, reset, handleSubmit, ...methods } = useForm({
        mode: 'onChange'
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [state, setState] = React.useState( {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const onError = (errorList) => {
        console.log(errorList)
    }


    let history = useHistory();

    // functions
    function onFormSubmit(data, e) {
            try {
                const result = axios.post(`http://localhost:8080/clients`, state);
                console.log('added client: ', result);
                setSubmitSuccess(true);
                history.push("/home");
            } catch (error) {
                console.error(error);
            }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onFormSubmit, onError)}>
             <div className="form-wrapper">
             <h2>Register</h2>
             <div className='form-item'>
                 <InputField
                     name="firstName"
                     label="First name"
                     type="text"
                     value={state.firstName}
                     onChange={handleChange}
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
                     onChange={handleChange}
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
                         onChange={handleChange}
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
                         onChange={handleChange}
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
                 <Button type="button" onClick={onFormSubmit}>Create account</Button>
             </ButtonWrapper>
             </div>
         </form>
     </FormProvider>
 );
}


