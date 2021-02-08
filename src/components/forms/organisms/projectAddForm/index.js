import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const ProjectAddForm = ({setAddProject}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    async function addProject(data) {
        console.log('access', data.access);
        try {
            const result = await axios.post(`http://localhost:8080/api/projects/`, data);
        } catch (error) {
            console.error(error);
        }
    }

    const onCancel = () => {
        setAddProject(false);
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(addProject)}>
                <h2>Edit project</h2>
                <div className='form-item'>
                    <InputField
                        name="title"
                        label="Project title"
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Title name is required',
                            }
                        })}
                    />
                </div>
                <div className='form-item'>
                    <InputField
                        name="title"
                        label="Project title"
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: 'Title name is required',
                            }
                        })}
                    />
                </div>
                <ButtonWrapper>
                    <Button onClick={addProject}
                            className="button button__primary button__margin-right">Save</Button>
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
            </form>
        </FormProvider>
    );
}


