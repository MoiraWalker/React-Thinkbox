import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import { useState } from 'react';
import './index.scss';
import axios from "axios";
import {useParams} from "react-router-dom";

export const WorkAddForm = ({setCancel, setAddPost}) => {
    const {id} = useParams();
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    async function addWork(data) {
        try {
            console.log("data", data);
            let file = data.fileupload[0];
            console.log("file", file);
            const base64 = await convertBase64(file);
            const formData = {...data, type: "WORK", fileUpload: base64 };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/posts/works', formData,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
           setAddPost(false);
        } catch(e) {
            console.log(e);
        }
    }

    const convertBase64 = (file) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function uploadFile(data) {
        try {
            let formData = new FormData();
            formData.append("file", data.fileupload[0]);
            const result = await axios.post(`http://localhost:8080/api/uploads`, formData);
        } catch(e) {
            console.error(e);
        }
    }

    const onSubmit= (data) => {
        let dataResponse = data;
        uploadFile(dataResponse);
        addWork(dataResponse);
    }

    const onCancel = () => {
        setCancel(true);
    }

    return (
        <div>
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-item'>
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
                            name="link"
                            label="Link"
                            type="text"
                            fieldRef={register}
                        />
                    </div>
                    <div className='form-item'>
                        <InputField
                            name="fileupload"
                            label="File upload"
                            accept="image/*"
                            type="file"
                            fieldRef={register({
                                required: {
                                    value: true,
                                    message: 'File upload is required',
                                }
                            })}
                        />
                    </div>
                    <ButtonWrapper>
                        <Button  onClick={onSubmit} className="button button__primary button__margin-right">Save</Button>
                        <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                    </ButtonWrapper>
                </form>
            </FormProvider>
        </div>
    );
}


