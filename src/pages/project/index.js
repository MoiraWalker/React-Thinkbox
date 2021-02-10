import './index.scss';
import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Post } from "../../components/posts/post";

export const Project = () => {
    const {id} = useParams();
    const [project, setProject] = useState("");
    const [posts, setPosts] = useState("");

    useEffect(() => {
        getProject();
        getAllProjects();
    }, [])

    async function getProject() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects/${id}`);
            setProject(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllProjects() {
        try {
            const result = await axios.get(`http://localhost:8080/api/posts`);
            setPosts(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">{project.title}</h1>
                    { posts &&
                    <div className="page__items">
                        { posts.map((post) => {
                            return <Post title={post.title}></Post>
                        })}
                    </div>
                    }
            </div>
        </div>
    );
};
