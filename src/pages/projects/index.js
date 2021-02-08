import './index.scss';
import {ProjectInfo} from "../../components/projectInfo";
import {useEffect, useState} from "react";
import {Button} from "../../components/forms/atoms/button";
import axios from "axios";

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isDeleted, setIsDeleted] = useState(null);
    const [addProject, setAddProject] = useState(false);

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

    const addProjectForm = () => {
        setAddProject(true);
    }

    return (
        <div className='page__wrapper'>
            {addProject ?
                (<p>add projec</p>)
                :
                (<div className="page__container">
                        <div className="page__heading">
                            <h1 className="page__header">Projects</h1>
                            <Button onClick={addProjectForm}>Add project</Button>
                        </div>
                        {projects &&
                        <div className='user__container'>
                            {
                                projects.map((project) => {
                                    return <ProjectInfo id={project.id}
                                                        title={project.title}
                                                        privateView={project.privateView}
                                                        setIsDeleted={setIsDeleted}
                                                        setIsUpdated={setIsUpdated}/>
                                })
                            }
                        </div>
                        }
                    </div>
                )}

        </div>
    );
};
