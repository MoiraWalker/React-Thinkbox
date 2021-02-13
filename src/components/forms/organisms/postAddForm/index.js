import React from 'react';
import {ButtonWrapper, SelectBox} from "../../molecules";
import {Button, SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import { useState } from 'react';
import './index.scss';
import {AccountInfo} from "../../../accountInfo";
import {AccountEditForm} from "../accountEditForm";

export const PostAddForm = ({setAddPost}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [activeForm, setActiveForm] = useState();

    const addPost = (data) => {
        console.log(data);
    }

    const onCancel = () => {
        setAddPost(false);
    }

    const selectedReferrer = watch('postType');

    console.log("select", selectedReferrer);

    const renderActiveForm = () => {
        const components = {
            workForm: <AccountInfo setActiveForm={setActiveForm}/>,
            thoughtForm: <AccountEditForm setActiveForm={setActiveForm}/>,
        }
        return components[activeForm]
    }

    return (
        <div className="page__center">
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(addPost)}>
                    <div className="form-wrapper">
                        <h2>Add post</h2>
                        <div className='form-item'>
                            <SelectBox
                                name="type"
                                label="Post type"
                                id="type"
                                fieldRef={register({
                                    required: {
                                        value: true
                                    }
                                })}
                            >
                                <SelectOption name="postType" value="thought">Thought</SelectOption>
                                <SelectOption name="postType" value="work">Work</SelectOption>
                            </SelectBox>
                        </div>
                        <ButtonWrapper>
                            <Button onClick={addPost} className="button button__primary button__margin-right">Save</Button>
                            <Button type="button" className="button button__secondary" onClick={onCancel}>Cancel</Button>
                        </ButtonWrapper>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}


