import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjectsList } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';
import './styles/style.css';

export default function Projects() {
  const { setProjectList, projectList } = useContext(ProjectsContext);
  const { setIsLoading, isLoading } = useContext(GeneralDataContext);

  const checkSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
  const trashSVG = <FontAwesomeIcon icon={ faTrash } />;
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

  console.log('Lista de projetos: ', projectList);
  console.log('Tamanho da lista de projetos: ', projectList.length);

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
  {projectList.length > 0 ? projectList.map((project, index) => (
    <tr key={project.id}>
      <td>{index + 1}</td>
      <td>{project.name}</td>
      <td>
      <img
        src={project.image_url !== null ? `data:image/jpeg;base64,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` : noImage}
        alt="Imagem da lista de projetos"
      />
      </td>
      <td>{project.date}</td>
      <td>
        <Link to={`/projects/edit/${project.id}`}>
          {checkSVG}
        </Link>
        -
        <Link to={`/projects/delete/${project.id}`}>
          {trashSVG}
        </Link>
      </td>
    </tr>
  )) : (
    <tr>
      <td colSpan={5}>Nenhum projeto encontrado</td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}
