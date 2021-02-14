import React from 'react';
import {SelectBox} from "../../molecules";
import {SelectOption} from '../../atoms';
import {useForm, FormProvider} from 'react-hook-form';
import {useState, useEffect} from 'react';
import './index.scss';
import {ThoughtAddForm} from "../thoughtAddForm";
import {WorkAddForm} from "../workAddForm";

export const PostAddForm = ({setAddPost}) => {
    const {register, unregister, watch, reset, handleSubmit, ...methods} = useForm({
        mode: 'onChange'
    });
    const [cancel, setCancel] = useState();
    const [selectedType, setSelectedType] = useState("thought");


    const addPost = (data) => {
        console.log(data);
    }

    useEffect(() => {
        if (cancel === true) {
            setAddPost(false);
        }
    }, [cancel]);


    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
    }


    const renderActiveForm = () => {
        if (selectedType === "work") {
            return <WorkAddForm setCancel={setCancel} setAddPost={setAddPost}></WorkAddForm>
        } else if (selectedType === "thought") {
            return <ThoughtAddForm setCancel={setCancel} setAddPost={setAddPost}></ThoughtAddForm>
        }
    }

    return (
        <div className="page__center">
            <div className="form-wrapper">
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
                <form onSubmit={handleSubmit(addPost)}>
                        <h2>Add post</h2>
                        <div className='form-item'>
                            <SelectBox
                                label="Post type"
                                onChange={handleSelectChange}
                                value={selectedType}>
                                <SelectOption name="postType" value="thought">Thought</SelectOption>
                                <SelectOption name="postType" value="work">Work</SelectOption>
                            </SelectBox>
                        </div>

                </form>
            </FormProvider>
            {renderActiveForm()}
        </div>
        </div>
    );
}


