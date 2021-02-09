import './index.scss';
import { useParams } from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect } from 'react';

export const Project = () => {
    const { id } = useParams();
    const [ project, setProject ] = useState("");

    useEffect(() => {
        getProject()
    }, [])

    async function getProject() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects/${id}`);
            console.log( "Project" , id , result.data.title);
            setProject(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">{project.title}</h1>
            </div>
        </div>
    );
};


