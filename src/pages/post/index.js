import './index.scss';
import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Thought} from "../../components/posts/thought";
import { Work} from "../../components/posts/work";

export const Post = () => {
    const {id} = useParams();
    const [post, setPost] = useState("");

    async function getPost() {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get(`http://localhost:8080/api/posts/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setPost(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        getPost();
    },[])


    const getPostType = () => {
        if (post.type === "WORK") {
            return <Work title={post.title} description={post.description}></Work>
        } else if (post.type === "THOUGHT") {
            return <Thought title={post.title} description={post.description}></Thought>
        }
    }

    return (
        <div className="page__container page__center">
            {getPostType()}
        </div>
    );
};
