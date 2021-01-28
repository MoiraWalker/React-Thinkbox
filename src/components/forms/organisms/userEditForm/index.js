import React from 'react';
import { ButtonWrapper, InputField } from "../../molecules";
import { Button } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import './index.scss';

export const UserEditForm = ({ id, email, isDeleted, firstName, lastName }) => {
    const { register, unregister, watch, reset, handleSubmit, ...methods } = useForm({
        mode: 'onChange'
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const onError = (errorList) => {
        console.log(errorList)
    }

    function onSucces() {
        console.log("succes");
    }

    return (
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onSucces, onError)}>
             <h2>Edit user</h2>
             <div className='form-item'>
                 <InputField
                     name="firstName"
                     label="First name"
                     type="text"
                     value="klaas"
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
                         })}
                     />
                 </div>
             <ButtonWrapper>
                 <Button>Save</Button>
                 <Button className="button button__secondary">Cancel</Button>
             </ButtonWrapper>
         </form>
     </FormProvider>
 );
}


