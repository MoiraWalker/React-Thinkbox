import './index.scss';
import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Thought } from "../../components/posts/thought";
import { Work } from "../../components/posts/work";
import { PostAddForm } from "../../components/forms/organisms/postAddForm";
import { Button } from "../../components/forms/atoms/button";

export const Project = () => {
    const {id} = useParams();
    const [project, setProject] = useState("");
    const [posts, setPosts] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [works, setWorks] = useState("");
    const [ addPost, setAddPost] = useState("false");

    useEffect(() => {
        getProject();
        getAllThoughts();
        getAllWorks();
    }, [])

    async function getProject() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects/${id}`);
            setProject(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllThoughts() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts/thoughts`);
            setThoughts(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllWorks() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts/works`);
            setWorks(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    const addPostForm = () => {
        setAddPost(true);
    }

    return (
        <div className='page__wrapper'>
            { addPost ?
                ( <PostAddForm setAddPost={setAddPost}></PostAddForm> )
                :
                (
                    <div className="page__container">
                        <div className="page__heading">
                            <h1 className="page__header">{project.title}</h1>
                            <Button onClick={addPostForm}>Add post</Button>
                        </div>
                        {thoughts &&
                        <div className="page__items">
                            {thoughts.map((thought) => {
                                return <Thought title={thought.title}></Thought>
                            })}
                        </div>
                        }
                        {works &&
                        <div className="page__items">
                            {works.map((work) => {
                                return <Work title={work.title}></Work>
                            })}
                        </div>
                        }
                    </div>
                )
            }
        </div>
    );
};
