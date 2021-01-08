import React from 'react';
import { ButtonWrapper, SelectBox, CheckboxInput, InputField, TextArea } from "../../molecules";
import { Button, SelectOption } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import './index.scss';
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
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
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

    const selectedReferrer = watch('pets');

    //down here axios
    const [clients, setClients] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        getAllClients();
    }, [])

    async function getAllClients() {
        try {
            const result = await axios.get(`http://localhost:8080/clients`);
            console.log('axios result: ', result);
            setClients(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    // async function addClient(client) {
    //     try {
    //         const result = await axios.post(`http://localhost:8080/clients`, client);
    //         console.log('axios result: ', result);
    //         getAllClients();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onFormSubmit, onError)}>
             <div className="form-wrapper">
             <h3>Register</h3>
             <div className='form-item'>
                 <InputField
                     name="firstName"
                     label="First name"
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
                     name="lastName"
                     label="Last name"
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
                         name="userId"
                         label="User Id"
                         type="text"
                         fieldRef={register({
                             required: {
                                 value: true,
                                 message: 'User name is required',
                             }
                         })}
                     />
                 </div>
             <ButtonWrapper>
                 <Button type="button" onClick={handleClick}>Create account</Button>
             </ButtonWrapper>
                 <ButtonWrapper>
                     <Button type="button" onClick={getAllClients}> Console log all clients</Button>
                 </ButtonWrapper>
             </div>
         </form>
     </FormProvider>
 );
}
