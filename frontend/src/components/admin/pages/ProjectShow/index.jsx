import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProject } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import { Link } from 'react-router-dom';

export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails, projectDetails } = useContext(ProjectsContext);
  const { isLoading, setIsLoading } = useContext(GeneralDataContext);

  const fetchProjectDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchProject(id);
      setProjectDetails(data);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setProjectDetails, id, setIsLoading]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  return (
    <div id="project-show-container">
      <div className="text-center my-5">
        <h1>{projectDetails.name}</h1>
      </div>
      <div className="message-container">
        <MessageCard />
      </div>
      <div className="d-flex justify-content-center w-100">
        <InnerOptionsNavbar>
          <Link to="/projects" className="btn btn-dark">
            Voltar
          </Link>
        </InnerOptionsNavbar>
      </div>
      <div className="project-show-container">
        <div id="image-container">
          <img
            src={projectDetails.image_url !== null ? `http://localhost/storage/${projectDetails.image_url}` : noImage}
            alt="Imagem do projeto"
          />
        </div>
      </div>
      <div id="project-show-edit-container">
        <div
        id="project-show-info"
        className='project-show-edit-box'
        >
          <div className="project-show-info-item">
            <h6>Nome:&nbsp;</h6>
            <span>{projectDetails.name}</span>
          </div>
          <div className="project-show-info-item">
            <h6>Descricao:&nbsp;</h6>
            <span>{projectDetails.description}</span>
          </div>
        </div>
        <div
        id="project-show-form"
        className="project-show-edit-box"
        >
          Teste
        </div>
      </div>
    </div>
  );
}