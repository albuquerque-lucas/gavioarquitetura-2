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
import Loading from '../../assets/Loading';
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
      [field]: field === "active_carousel" ? parseInt(value, 10) : value,
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
    try {
      const updatedDetails = {
        [field]: editedDetails[field],
      };

      await saveProject(updatedDetails, projectDetails.id);
      const updatedProject = await fetchProject(id);
      setProjectDetails(updatedProject);
      // setEditMode({
      //   ...editMode,
      //   [field]: !editMode[field],
      // });
      console.log('Projeto atualizado com sucesso:', updatedProject);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
    } finally {
      setEditedDetails({
        name: "",
        description: "",
        area: "",
        year: "",
        address: "",
        image_url: "",
        category_id: "0",
        active_carousel: "0",
      });
      console.log(editedDetails);
    }
  };

  const renderDefaultCell = (name, field) => {

    return (
    <div className="edition-item">
          <span>{ name }: </span>
          <span>{ projectDetails[field] }</span>
          <button className='btn btn-sm edit-btn'>
            {editSVG}
          </button>
          <input
          type="text"
          placeholder={projectDetails[field]}
          value={editedDetails[field]}
          onChange={(event) => handleChange(field, event.target.value)}
          name={field}
          />
          <button
            className='btn btn-sm confirm-btn'
            onClick={ (event) => handleUpdate(event, field) }
          >
            { confirmSVG }
          </button>
          <button className='btn btn-sm cancel-btn'>
            { cancelSVG }
          </button>
        </div>
    );
  }

  const renderCategoryCell = (name, field) => {
    console.log('Lista de Categorias: ', categoriesList);
    return (
      <div className="edition-item">
      <span>{ name }: </span>
      <span>{ projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada' }</span>
      <button className='btn btn-sm edit-btn'>
        {editSVG}
      </button>
      <select
        name="categpry"
        value={editedDetails[field] || 1}
        onChange={(e) => handleChange(field, e.target.value)}
      >
        { categoriesList.map((category, index) => (
          <option
          key={ index }
          value={category.id}
          >
            {category.name}
            </option>
        ))}
      </select>
      <button
      className='btn btn-sm confirm-btn'
      onClick={ (event) => handleUpdate(event, field) }
      >
        { confirmSVG }
      </button>
      <button className='btn btn-sm cancel-btn'>
        { cancelSVG }
      </button>
    </div>
    );
  }

  const renderCarouselCell = (name, field) => {
    return (
      <div className="edition-item">
        <span>{name}: </span>
        <span>{projectDetails[field] ? 'Ativo' : 'Inativo'}</span>
        <button className='btn btn-sm edit-btn'>
          {editSVG}
        </button>
        <select
          name={field}
          value={editedDetails[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          <option value={ 1 }>Ativo</option>
          <option value={ 0 }>Inativo</option>
        </select>
        <button
          className='btn btn-sm confirm-btn'
          onClick={(event) => handleUpdate(event, field)}
        >
          {confirmSVG}
        </button>
        <button className='btn btn-sm cancel-btn'>
          {cancelSVG}
        </button>
      </div>
    );
  };

  const renderTextCell = (name, field) => {
    return (
      <div className="edition-item text-item">
      <span>{ name }: </span>
      <span className='text-edit-content'>{ projectDetails[field] }</span>
      <button className='btn btn-sm edit-btn'>
        {editSVG}
      </button>
      <textarea
      placeholder={projectDetails[field]}
      value={editedDetails[field]}
      onChange={(event) => handleChange(field, event.target.value)}
      name={field}
      >
      </textarea>
      <button
        className='btn btn-sm confirm-btn'
        onClick={ (event) => handleUpdate(event, field) }
      >
        { confirmSVG }
      </button>
      <button className='btn btn-sm cancel-btn'>
        { cancelSVG }
      </button>
    </div>
    );
  }

  console.log('Detalhes do Projeto:', projectDetails);
  console.log('Detalhes Editados: ', editedDetails);


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
          {isLoading ? (
      <div className="loading-container">
        <Loading />
      </div>
    ) : (
      <div>

        <div className="project-show-container">
          <div id="image-container">
            <img
              src={ projectDetails.image_url !== null ? `http://localhost/storage/${projectDetails.image_url}` : noImage }
              alt="Imagem do projeto"
            />
          </div>
        </div>
        <div id="project-show-edit-container" >
          <h4>Ficha tecnica:</h4>
          { renderCategoryCell('Categoria', 'category_id') }
          { renderDefaultCell('Nome', 'name') }
          { renderDefaultCell('Area', 'area') }
          { renderDefaultCell('Localizacao', 'address') }
          { renderDefaultCell('Data', 'year') }
          { renderTextCell('Descricao', 'description') }
          { renderCarouselCell('Exibir na pagina inicial', 'active_carousel') }
        </div>
        <div className="project-show-images-list">
          <div className="images-input-container">
            <input type="file" name="images" id="images" />
          </div>
          <div className="images-container">
            
          </div>
        </div>
      </div>
          )}
    </div>
  );
}