import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import CategoriesContext from '../../../../context/CategoriesContext/CategoriesContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProject } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { renderProjectInfoItem, renderInputField } from './functions';


export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails, projectDetails } = useContext(ProjectsContext);
  const { isLoading, setIsLoading } = useContext(GeneralDataContext);
  const { categoriesList } = useContext(CategoriesContext);


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
  console.log(categoriesList);
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
          {renderProjectInfoItem('Imagem', projectDetails.image_url)}
          {renderProjectInfoItem('Nome', projectDetails.name)}
          {renderProjectInfoItem('Categoria', projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada')}
          {renderProjectInfoItem('Area', projectDetails.area)}
          {renderProjectInfoItem('Localizacao', projectDetails.address)}
          {renderProjectInfoItem('Descricao', projectDetails.description)}
          {renderProjectInfoItem('Data', projectDetails.year)}
          {renderProjectInfoItem('Exibir na pagina inicial', projectDetails.active_carousel)}
        </div>
        <div
        id="project-show-form"
        className="project-show-edit-box"
        >
          {renderInputField('file', 'image_url', projectDetails.image_url)}
          {renderInputField('text', 'name', projectDetails.name)}
          {renderInputField('select', 'category', projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada', categoriesList)}
          {renderInputField('text', 'area', projectDetails.area)}
          {renderInputField('text', 'address', projectDetails.address)}
          {renderInputField('text', 'description', projectDetails.description)}
          {renderInputField('text', 'year', projectDetails.year)}
          {renderInputField('select', 'active_carousel', projectDetails.active_carousel)}
        </div>
      </div>
    </div>
  );
}