import React from 'react';
import {ButtonWrapper, InputField, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const ProjectAddForm = ({setAddProject, setNewProject}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    async function addProject(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/projects', data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setNewProject(true);
            setAddProject(false);
        } catch (e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        setAddProject(false);
    }

    return (
        <div className="page__center">
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(addProject)}>
                    <div className="form-wrapper">
                        <h2>Add project</h2>
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
                            <SelectBox
                                name="privateView"
                                label="Accessability"
                                id="access"
                                fieldRef={register({
                                    required: {
                                        value: true
                                    }
                                })}
                            >
                                <SelectOption name="pets" value={false}>Private</SelectOption>
                                <SelectOption name="pets" value={true}>Public</SelectOption>
                            </SelectBox>
                        </div>
                        <ButtonWrapper>
                            <Button onClick={addProject}
                                    className="button button__primary button__margin-right">Save</Button>
                            <Button type="button" className="button button__secondary"
                                    onClick={onCancel}>Cancel</Button>
                        </ButtonWrapper>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}


