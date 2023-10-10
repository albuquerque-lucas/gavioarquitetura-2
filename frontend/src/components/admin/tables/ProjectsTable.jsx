import React, { useContext, useEffect } from 'react';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';
import ProjectItem from "./cells/ProjectItem";
import Loading from '../cards/Loading';
import { fetchProjectsList } from '../../../utils/ProjectsFetch';
import './styles/projectsTable.css';

export default function ProjectsTable() {
  const { setProjectList, setIsLoading, isLoading, projectList } = useContext(ProjectsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjectsList();
        setProjectList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setProjectList([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProjectList, setIsLoading]);

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
            { projectList.length > 0 && projectList.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
