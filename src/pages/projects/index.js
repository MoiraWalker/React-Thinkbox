import './index.scss';
import {ProjectInfo} from "../../components/projectInfo";
import {useEffect, useState} from "react";
import axios from "axios";


export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isDeleted, setIsDeleted] = useState(null);

    useEffect(() => {
        getAllProjects();
    }, [])

    useEffect(() => {
        if (isDeleted) {
            getAllProjects();
            setIsDeleted(null);
        }
    }, [isDeleted])

    useEffect(() => {
        if (isUpdated) {
            getAllProjects();
            setIsUpdated(null);
        }
    }, [isUpdated])

    async function getAllProjects() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects`);
            console.log("projects", result);
            setProjects(result.data.sort(function (a, b) {
                return a.id - b.id;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    console.log("projects", projects);

    return (
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Projects</h1>
                {projects &&
                <div className='user__container'>
                    {
                        projects.map((project) => {
                            return <ProjectInfo id={projects.id} title={project.title} privateView={project.privateView}/>
                        })
                    }
                </div>
                }
            </div>
        </div>
    );
};
