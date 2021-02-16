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
            const formData = {...data, type:"WORK", fileupload: upload };
            console.log("formdata", formData);
            const result = await axios.post(`http://localhost:8080/api/posts/works`, formData);
            setAddPost(false);
        } catch (error) {
            console.error(error);
        }
    }

    // async function uploadFile(data) {
    //         let formData = new FormData();
    //         formData.append("file", data.fileupload[0]);
    //         console.log("FormDa", formData);
    //         const result = await axios.post(`http://localhost:8080/api/uploads`, formData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const onCancel = () => {
        setCancel(true);
    }

    return (
    <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(addWork)}>
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
                {/*<input ref={register} id="fileupload" type="file" name="fileupload" />*/}
                <ButtonWrapper>
                    <Button onClick={addWork} className="button button__primary button__margin-right">Save</Button>
                    <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                </ButtonWrapper>
            </form>
        </FormProvider>
    );
}


