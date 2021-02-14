import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const WorkEditForm = ({id, toggleEdit, title, description, setIsUpdated}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        defaultValues: {title: title, description: description},
        mode: 'onChange'
    });

    const onCancel = () => {
        toggleEdit(false);
    }

    async function updateWork(data) {
        try {
            const formData = {...data, type:"WORK"}
            const result = await axios.put(`http://localhost:8080/api/posts/works/${id}`, formData);
            setIsUpdated(true);
            toggleEdit(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(updateWork)}>
                <div className="form-wrapper">
                    <div className='form-item'>
                        <h2>Edit Thought</h2>
                        <InputField
                            name="title"
                            label="Title"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Title is required',
                                }
                            })}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="description"
                            label="Description"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Description is required',
                                }
                            })}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="description"
                            label="Description"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Description is required',
                                }
                            })}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="description"
                            label="Description"
                            type="text"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'Description is required',
                                }
                            })}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="link"
                            label="Link"
                            type="text"
                            fieldRef={register}
                        />
                    </div>
                    <ButtonWrapper>
                        <Button onClick={updateWork} className="button button__primary button__margin-right">Save</Button>
                        <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                    </ButtonWrapper>
                </div>
            </form>
        </FormProvider>
    );
}


