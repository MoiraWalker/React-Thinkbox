import React from 'react';
import { ButtonWrapper, SelectBox, CheckboxInput, InputField, TextArea } from "../../molecules";
import { Button, SelectOption } from '../../atoms';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import './index.scss';
import close from '../../../../assets/images/close.svg'

export const ExampleForm = () => {
    const { register, unregister, watch, reset, handleSubmit, ...methods } = useForm({
        mode: 'onChange'
    });
    const [sumbitSuccess, setSubmitSuccess] = useState(false);

    function onFormSubmit(data, e) {
        setSubmitSuccess(true);
        e.target.reset();
    }

    function onToaster(data) {
        setSubmitSuccess(false);
    }

    const onError = (errorList) => {
        console.log(errorList)
    }

    const selectedReferrer = watch('pets');

 return (
     <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
         <form onSubmit={handleSubmit(onFormSubmit, onError)}>
             <div className="form-wrapper">
             <legend>Personal Details</legend>
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
                     type="number"
                     name="age"
                     label="Leeftijd"
                     fieldRef={register({
                         required: {
                             value: true,
                             message: 'Leeftijd is verplicht',
                         },
                         min: {
                             value: 18,
                             message: 'Je moet minimaal 18 jaar zijn'
                         }
                     })}
                 />
             </div>
             <div  className='form-item'>
                 <InputField
                     name="zipCode"
                     label="Postcode"
                     fieldRef={register({
                         required: {
                             value: true,
                             message: 'Postcode   is verplicht',
                         },
                         pattern: {
                             value: /^[0-9]{4}[a-zA-Z]{2}$/,
                             message: 'The given Zipcode is not valid'
                         }
                     })}
                 />
             </div>
             <div  className='form-item'>
                 <SelectBox
                 name="pets"
                 label="Pets"
                 id="details-pets"
                 fieldRef={register({
                     required: {
                         value: true,
                         message: 'Last name is required',
                     }
                 })}
                 >
                     <SelectOption name="pets" value="cat">Cat</SelectOption>
                     <SelectOption name="pets" value="dog">Dog</SelectOption>
                     <SelectOption name="pets" value="hamster">Hamster</SelectOption>
                     <SelectOption name="pets" value="mouse">Mouse</SelectOption>
                     <SelectOption name="pets" value="different">Different</SelectOption>
                 </SelectBox>
                 {selectedReferrer === "different" &&
                     <div className="input-different">
                         <InputField
                             name="input-different"
                             label="Different pet"
                             fieldRef={register({
                                 required: {
                                     value: true,
                                     message: 'Pet is required',
                                 },
                             })}
                         />
                     </div>
                  }
             </div>
             <div className="form-item">
                 <TextArea
                     label="Comments"
                     placeholder="type your comment"
                     rows="3"
                     cols="3"
                 ></TextArea>
             </div>
             <div className='form-item'>
                 <CheckboxInput
                     label="Terms and conditions"
                     name="checkbox"
                     id="details-checkbox"
                     fieldRef={register({
                         required: {
                             value: true,
                             message: 'Terms and Conditions are required',
                         }
                     })}

                 >Terms and conditions</CheckboxInput>

             </div>
             <ButtonWrapper>
                 <Button>Submit</Button>
             </ButtonWrapper>
             </div>
             {sumbitSuccess &&
                 <div onAnimationEnd={onToaster}  className='form-sent'>
                       <p className="form-sent-p">Form sent!</p>
                       <img className="form-sent-img" src={close} width="15px " alt="close" />
                 </div>
             }
         </form>
     </FormProvider>
 );
}
