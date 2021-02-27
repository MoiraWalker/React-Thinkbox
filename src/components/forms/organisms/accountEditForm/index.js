import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import './index.scss';
import axios from "axios";
import {useAuthState} from "../../../../context/authContextProvider";

export const AccountEditForm = ({ setIsUpdated, setActiveComponent, username, email, id  }) => {
    const { register, unregister, watch, reset, handleSubmit,  ...methods } = useForm({
        defaultValues: { username: username, email: email},
        mode: 'onChange'
    });
    const {user} = useAuthState();

    async function updateAccount(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/api/users/${id}`, data ,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
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
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(updateAccount, onError)}>
             <div className='form-item'>
                 <InputField
                     className="label--light"
                     name="username"
                     label="User name"
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
                 <Button onClick={updateAccount} className="button button__primary button__margin-right">Save Changes</Button>
                 <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
             </ButtonWrapper>
         </form>
     </FormProvider>
 );
}


