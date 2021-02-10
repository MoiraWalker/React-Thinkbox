import './index.scss';
import { ProjectInfo } from "../../components/projectInfo";
import { useEffect, useState } from "react";
import { Button } from "../../components/forms/atoms/button";
import axios from "axios";
import { ProjectAddForm } from "../../components/forms/organisms/projectAddForm";

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isDeleted, setIsDeleted] = useState(null);
    const [addProject, setAddProject] = useState(false);
    const [ newProject, setNewProject ] = useState(false);

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

    useEffect(() => {
        if (newProject) {
            getAllProjects();
            setNewProject(false);
        }
    }, [newProject])


    async function getAllProjects() {
        try {
            const result = await axios.get(`http://localhost:8080/api/projects`);
            setProjects(result.data.sort(function (a, b) {
                return a.id - b.id;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const addProjectForm = () => {
        setAddProject(true);
    }

    return (
        <div className='page__wrapper'>
            {addProject ?
                (<ProjectAddForm setAddProject={setAddProject} setNewProject={setNewProject}/> )
                :
                (<div className="page__container">
                        <div className="page__heading">
                            <h1 className="page__header">Projects</h1>
                            <Button onClick={addProjectForm}>Add project</Button>
                        </div>
                        {projects &&
                        <div className='page__items'>
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
