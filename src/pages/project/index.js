import './index.scss';
import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import {ThoughtInfo} from "../../components/posts/thoughtInfo";
import {WorkInfo} from "../../components/posts/workInfo";
import {PostAddForm} from "../../components/forms/organisms/postAddForm";
import {Button} from "../../components/forms/atoms/button";
import {WorkAddForm} from "../../components/forms/organisms/workAddForm";
import {ThoughtAddForm} from "../../components/forms/organisms/thoughtAddForm";

export const Project = () => {
    const {id} = useParams();
    const [project, setProject] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [works, setWorks] = useState("");
    const [addPost, setAddPost] = useState(false);
    const [posts, setPosts] = useState("");

    useEffect(() => {
        getProject();
        getAllThoughts();
        getAllWorks();
        getAllPosts();
    }, [])

    useEffect(() => {
        getAllThoughts();
    }, [addPost])

    useEffect(() => {
        getAllPosts();
    }, [posts]);

    async function getProject() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects/${id}`);
            setProject(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllPosts() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts`);
            setPosts(result.data);
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

    const renderPost = (post) => {
        if (post.type === "THOUGHT") {
            return <ThoughtInfo id={post.id} title={post.title} description={post.description}></ThoughtInfo>
        } else if (post.type === "WORK") {
            return <WorkInfo id={id} title={post.title}></WorkInfo>
        }
    }

    return (
        <div className='page__wrapper'>
            {addPost ?
                (<PostAddForm setAddPost={setAddPost}></PostAddForm>)
                :
                (<div className="page__container">
                    <div className="page__heading">
                        <h1 className="page__header">{project.title}</h1>
                        <Button onClick={addPostForm}>Add post</Button>
                    </div>

                    {posts &&
                    <div className="page__items">
                        {posts.map((post) => {
                            return renderPost(post);
                        })}
                    </div>
                    }
                </div>)
            }
        </div>
    );
};
