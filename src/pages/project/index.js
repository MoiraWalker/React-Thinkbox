import './index.scss';
import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import {ThoughtInfo} from "../../components/posts/thoughtInfo";
import {WorkInfo} from "../../components/posts/workInfo";
import {PostAddForm} from "../../components/forms/organisms/postAddForm";
import {Button} from "../../components/forms/atoms/button";
import {SelectBox} from "../../components/forms/molecules";
import {SelectOption} from "../../components/forms/atoms/selectOption";

export const Project = () => {
    const {id} = useParams();
    const [project, setProject] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [works, setWorks] = useState("");
    const [addPost, setAddPost] = useState(false);
    const [posts, setPosts] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        getProject();
        getAllThoughts();
        getAllWorks();
        getAllPosts();
    }, [])

    useEffect(() => {
        getAllThoughts();
        getAllWorks();
    }, [addPost])

    useEffect(() => {
        getAllPosts();
    }, [addPost]);


    async function getProject() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/projects/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setProject(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllPosts() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/posts/project/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setPosts(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllThoughts() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/posts/thoughts/project/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setThoughts(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllWorks() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/posts/works/project/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setWorks(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const addPostForm = () => {
        setAddPost(true);
    }

    const renderPost = (post) => {
        if (post.type === "THOUGHT" && selectedType === "thought") {
            return <ThoughtInfo id={post.id} title={post.title} description={post.description}></ThoughtInfo>
        } else if (post.type === "WORK" && selectedType === "work") {
            return <WorkInfo image={post.fileUpload} id={post.id} title={post.title} description={post.description} link={post.link}></WorkInfo>
        } else if (post && selectedType === "all") {
            if (post.type === "THOUGHT") {
                return <ThoughtInfo id={post.id} title={post.title} description={post.description}></ThoughtInfo>
            } else if (post.type === "WORK") {
                return <WorkInfo  image={post.fileUpload}  id={post.id} title={post.title} description={post.description}
                                 link={post.link}></WorkInfo>
            }
        }
    }

    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
    }

    return (
        <div className='page__wrapper'>
            {addPost ?
                (<PostAddForm setAddPost={setAddPost}></PostAddForm>)
                :
                (<div className="page__container">
                    <div className="page__heading">
                        <h1 className="page__header">{project.title}</h1>
                        <div className="project__buttons">
                            <form>
                                <SelectBox
                                    className="select__type"
                                    onChange={handleSelectChange}
                                    value={selectedType}>
                                    <SelectOption name="postType" value="all">All</SelectOption>
                                    <SelectOption name="postType" value="thought">Thought</SelectOption>
                                    <SelectOption name="postType" value="work">Work</SelectOption>
                                </SelectBox>
                            </form>
                            <Button onClick={addPostForm}>Add post</Button>
                        </div>
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
