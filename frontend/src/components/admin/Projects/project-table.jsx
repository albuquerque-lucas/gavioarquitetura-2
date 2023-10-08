import React, { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';
import ProjectItem from "./project-item";
import Loading from '../cards/Loading';
import noImage from '../../../images/projects/no-image.jpg';

export default function ProjectTable() {
  const { projectList, setProjectList, isLoading, setIsLoading } = useContext(ProjectsContext);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1/api/projects');
      const data = await response.json();
      setProjectList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      setIsLoading(false);
    }
  }, [setProjectList, setIsLoading]);

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1/api/projects/${id}`, {
      method: 'DELETE',
    });

    const newListRes = await fetch('http://127.0.0.1/api/projects');
    const newList = await newListRes.json();

    setProjectList(newList);
    console.log('Projeto excluído com sucesso:', id);
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="table-container">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="table table-hover table-bordered mt-3 w-75">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Area</th>
              <th>Imagem</th>
              <th>Editar / Excluir</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project) => (
              <tr className='table-cell' key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.area}</td>
                <td className='table-img-container'>
                  <img src={noImage} alt="" />
                </td>
                <td className='table-btn-container'>
                  <Link to={`/projects/${project.id}`}>
                    <button className="btn btn-dark">Editar</button>
                  </Link>
                  <button className="btn btn-dark" onClick={() => handleDelete(project.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
