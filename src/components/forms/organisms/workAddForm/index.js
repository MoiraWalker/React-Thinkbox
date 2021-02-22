import React from 'react';
import {ButtonWrapper, InputField} from "../../molecules";
import {Button} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import './index.scss';
import axios from "axios";

export const WorkAddForm = ({setCancel, setAddPost}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });

    async function addWork(data) {
        try {
            let upload = data.fileupload[0]
            const formData = {...data, type: "WORK", fileName: "fileName"};
            console.log("formdata", formData);
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

    async function uploadFile(data) {
        try {
            console.log("UPLOADFILE", data);
            let formData = new FormData();
            formData.append("file", data.fileupload[0]);
            console.log("FormData", formData);
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
                            type="file"
                            fieldRef={register}
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


