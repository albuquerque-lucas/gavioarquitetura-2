import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';

export default function ProjectShow() {
  const {id} = useParams();
  const { projectDetails, setProjectDetails } = useContext(ProjectsContext);
  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1/api/projects/${id}`);
      const data = await response.json();
      setProjectDetails(data);
  } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
}, [setProjectDetails, id]);

useEffect(() => {
  fetchProject();
}, [fetchProject]);
console.log(projectDetails);
  return (
    <>
      <div className="text-center my-5">
        <h1>Project Show</h1>
      </div>
    </>
  );
}