import React from 'react';
import {ButtonWrapper, InputField, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState} from 'react';
import './index.scss';
import axios from "axios";

export const ThoughtEditForm = ({id, toggleEdit, title, description, setIsUpdated}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        defaultValues: {title: title, description: description},
        mode: 'onChange'
    });

    const onCancel = () => {
        toggleEdit(false);
    }

    // async function updateThought(data) {
    //     try {
    //         const formData = {...data, type:"THOUGHT"}
    //         const result = await axios.put(`http://localhost:8080/api/posts/thoughts/${id}`, formData);
    //         setIsUpdated(true);
    //         toggleEdit(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function updateThought(data) {
        try {
            const formData = {...data, type:"THOUGHT"}
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/api/posts/thoughts/${id}`, formData,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsUpdated(true);
            toggleEdit(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(updateThought)}>
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
                <ButtonWrapper>
                    <Button onClick={updateThought} className="button button__primary button__margin-right">Save</Button>
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
                </div>
            </form>
        </FormProvider>
    );
}


