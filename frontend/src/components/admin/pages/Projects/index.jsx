import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import ProjectRow from './ProjectRow';
import Loading from '../../assets/Loading';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjectsList, deleteProject } from '../../../../utils/ProjectsFetch';
import './styles/style.css';

export default function Projects() {
  const { setProjectList, projectList } = useContext(ProjectsContext);
  const { setIsLoading, isLoading } = useContext(GeneralDataContext);
  const respondeMessage = false;

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

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteProject(id);
      const data = await fetchProjectsList();
      setProjectList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      setIsLoading(false);
    }
  }

  return (
    <div id='project-list-container'>
      <div className="text-center my-5">
        <h1>Projetos</h1>
      </div>
      <div className="message-container">
        {respondeMessage && <MessageCard />}
      </div>
      <div className="inner-options-container">
        <InnerOptionsNavbar>
          <Link to="/projects/new-project" className="btn btn-dark">
            Novo projeto
          </Link>
        </InnerOptionsNavbar>
      </div>
      <div id="project-table-container">
        {isLoading ? (
          // Se isLoading for verdadeiro, mostra o componente Loading
          <Loading />
        ) : (
          // Se isLoading for falso, mostra a tabela
          <table id="project-table-admin">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Capa</th>
                <th>Data</th>
                <th>Editar / Excluir</th>
              </tr>
            </thead>
            <tbody>
              {projectList.length > 0 ? (
                projectList.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    deleteFunction={handleDelete}
                  />
                ))
              ) : (
                // Mostra a mensagem apenas se o carregamento foi concluído
                <tr>
                  <td colSpan={5}>Nenhum projeto encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
