import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState} from 'react';
import './index.scss';


export const AccountChangePasswordForm = ({setActiveComponent, id}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [warning, setWarning] = useState(false);

    const onError = (errorList) => {
        console.log(errorList)
    }

    const passwordWarning = () => {
        setWarning(true);
    }

    console.log("warning", warning);

    const onCancel = () => {
        setActiveComponent('show');
        setWarning(false);
    }

    return (
        <div>
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(passwordWarning, onError)}>
                <div className='form-item top'>
                    <InputField
                        className="label--light"
                        name="password"
                        label="Password"
                        type="password"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Password is required',
                            }
                        })}
                    />
                </div>
                <div className='form-item'>
                    <InputField
                        className="label--light"
                        name="repeat-password"
                        label="Repeat password"
                        type="password"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Repeat password is required',
                            }
                        })}
                    />
                </div>
                <ButtonWrapper>
                    <Button onClick={passwordWarning} className="button button__primary button__margin-right">Save
                        Changes</Button>
                    <Button type="button" className="button button__tertairy" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
            </form>
        </FormProvider>
            { warning && <div className="warning">
                <p>Save changes for password not implemented yet. Updating a password will break the token from logged in user.</p>
            </div> }
        </div>
    );
}


