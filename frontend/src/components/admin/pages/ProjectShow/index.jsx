import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import CategoriesContext from '../../../../context/CategoriesContext/CategoriesContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProject, saveProject } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';


export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails, projectDetails, setEditedDetails, editedDetails, editMode, setEditMode } = useContext(ProjectsContext);
  const { isLoading, setIsLoading } = useContext(GeneralDataContext);
  const { categoriesList } = useContext(CategoriesContext);
  
  const editSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
  const cancelSVG = <FontAwesomeIcon icon={ faXmark } />;
  const confirmSVG = <FontAwesomeIcon icon={ faCheck } />;

  
  const handleChange = (field, value) => {
    setEditedDetails({
      ...editedDetails,
      [field]: value,
    });
  };
  
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
  
  const handleUpdate = async (event, field) => {
    event.preventDefault();
    console.log('field:', field);
    console.log('editedDetails:', editedDetails);
    try {
      const updatedProject = await saveProject(editedDetails, projectDetails.id);
      setProjectDetails(updatedProject);
      setEditMode({
        ...editMode,
        [field]: !editMode[field],
      });
      console.log('Projeto atualizado com sucesso:', updatedProject);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
    }
  };

  const renderDefaultEditCell = (name, field) => {
    return (
    <div className="edition-item">
          <span>{ name }: </span>
          <span>{ projectDetails[field] }</span>
          <button className='btn btn-sm edit-btn'>
            {editSVG}
          </button>
          <input type="text" placeholder={projectDetails[field]} />
          <button className='btn btn-sm confirm-btn'>
            { confirmSVG }
          </button>
          <button className='btn btn-sm cancel-btn'>
            { cancelSVG }
          </button>
        </div>
    );
  }

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
      <div id="project-show-edit-container" >
        <h4>Ficha tecnica:</h4>
        { renderDefaultEditCell('Nome', 'name') }
        { renderDefaultEditCell('Localizacao', 'address') }
        { renderDefaultEditCell('Data', 'year') }
        { renderDefaultEditCell('Descricao', 'description') }
      </div>
    </div>
  );
}