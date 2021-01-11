import React from 'react';
import { ButtonWrapper, SelectBox, CheckboxInput, InputField, TextArea } from "../../molecules";
import { Button, SelectOption } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import './index.scss';
import {NavLink, useHistory} from "react-router-dom";
import { LinkWrapper } from "../../molecules/linkWrapper";
import close from "../../../../assets/images/close.svg";


export const LoginForm = () => {
    const { register, unregister, watch, reset, handleSubmit, ...methods } = useForm({
        mode: 'onChange'
    });
    const [sumbitSuccess, setSubmitSuccess] = useState(false);

    let history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    function onFormSubmit(data, e) {
        setSubmitSuccess(true);
        console.log(data);
        e.target.reset();
    }

    function onToaster(data) {
        setSubmitSuccess(false);
        console.log("toaster");
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

    const selectedReferrer = watch('pets');

 return (
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onFormSubmit, onError)}>
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
                 <Button type="button" onClick={handleClick}>Submit</Button>
             </ButtonWrapper>
                 <LinkWrapper>
                    <NavLink to="/register" exact activeClassName="link--active" className="link">Create account</NavLink>
                 </LinkWrapper>
             </div>
         </form>
     </FormProvider>
 );
}
