import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import CategoriesContext from '../../../../context/CategoriesContext/CategoriesContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchById, saveProject } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import { Link } from 'react-router-dom';
import Loading from '../../assets/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { mapUpdateField } from '../../../../utils/mappers';


export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails, projectDetails, setEditedDetails, editedDetails, editMode, setEditMode } = useContext(ProjectsContext);
  const { isLoading, setIsLoading } = useContext(GeneralDataContext);
  const { categoriesList } = useContext(CategoriesContext);
  
  const editSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
  const cancelSVG = <FontAwesomeIcon icon={ faXmark } />;
  const confirmSVG = <FontAwesomeIcon icon={ faCheck } />;

  const notify = (field) => toast.success(`Campo ${mapUpdateField(field)} atualizado com sucesso.`);

  const handleChange = (field, event) => {
    let value;
  
    if (event.target.type === 'file') {
      value = event.target.files[0];
      console.log(value);
    } else {
      // Se o campo for um select e o valor for um objeto, extrai o valor correto
      value = event.target.value;
      if (typeof value === 'object' && value !== null) {
        value = value.id;
      }
  
      setEditedDetails({
        ...editedDetails,
        [field]: field === 'active_carousel' ? parseInt(value, 10) : value,
      });
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    setEditedDetails({
      ...editedDetails,
      image_url: files[0],
    });
  }

  const fetchProjectDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchById(id);
      setProjectDetails(data);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setProjectDetails, id, setIsLoading]);
  
  useEffect(() => {
    fetchProjectDetails();
    setEditMode({
      name: false,
      description: false,
      area: false,
      year: false,
      address: false,
      image_url: false,
      category_id: false,
      active_carousel: false,
    });
  }, [fetchProjectDetails]);
  
  const handleUpdate = async (event, field) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append(field, editedDetails[field]);
  
      await saveProject(formData, projectDetails.id);
      for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }
      const updatedProject = await fetchById(projectDetails.id);
      setProjectDetails(updatedProject);
      notify(field);
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
        category_id: "1",
        active_carousel: "1",
      });
    }
  };

  const cancelEdition = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
    setEditedDetails({
      ...editedDetails,
      [field]: '',
    });
  }

  const renderDefaultCell = (name, field) => {
    return (
      <div className="edition-item">
        <span>{ name }: </span>
        <span>{ projectDetails[field] }</span>
        <button
          className='btn btn-sm edit-btn'
          onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
        >
          {editSVG}
        </button>
        { 
          editMode[field] && (
            <>
              <input
                type="text"
                placeholder={projectDetails[field]}
                value={editedDetails[field]}
                onChange={(event) => handleChange(field, event)}
                name={field}
              />
              <button
                className='btn btn-sm confirm-btn'
                onClick={ (event) => handleUpdate(event, field) }
              >
                { confirmSVG }
              </button>
              <button
                className='btn btn-sm cancel-btn'
                onClick={() => cancelEdition(field)}
              >
              {cancelSVG}
            </button>
            </>
          )
        }
      </div>
    );
  }

  const renderFileCell = (name) => {

    return (
    <div className="edition-item">
          <span>{ name }: </span>
          <span>{ projectDetails['image_url'] ? projectDetails['image_url'].substring(0, 25) : 'Sem imagem' }</span>
          <button
            className='btn btn-sm edit-btn'
            onClick={() => setEditMode({ ...editMode, 'image_url': !editMode['image_url'] })}
          >
            {editSVG}
          </button>
          {
            editMode['image_url'] && (
              <>
                <input
                type="file"
                files={editedDetails['image_url']}
                placeholder={projectDetails['image_url']}
                onChange={(event) => handleFileChange(event)}
                name='image_url'
                />
                <button
                  className='btn btn-sm confirm-btn'
                  onClick={ (event) => handleUpdate(event, 'image_url') }
                >
                  { confirmSVG }
                </button>
                <button
                  className='btn btn-sm cancel-btn'
                  onClick={() => setEditMode({ ...editMode, 'image_url': !editMode['image_url'] })}
                >
                  {cancelSVG}
                </button>
              </>
            )
          }

        </div>
    );
  }

  const renderCategoryCell = (name, field) => {
    return (
      <div className="edition-item">
      <span>{ name }: </span>
      <span>{ projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada' }</span>
      <button
      className='btn btn-sm edit-btn'
      onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
      >
        {editSVG}
      </button>
      {
        editMode[field] && (
          <>
            <select
              name="categpry"
              value={editedDetails[field] === '0' ? 1 : editedDetails[field]}
              onChange={(event) => handleChange(field, event)}
            >
              { categoriesList.map((category, index) => (
                <option
                key={ index }
                value={ Number(category.id) }
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
            <button
              className='btn btn-sm cancel-btn'
              onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
            >
              {cancelSVG}
            </button>
          </>
        )
      }
    </div>
    );
  }

  const renderCarouselCell = (name, field) => {
    return (
      <div className="edition-item">
        <span>{name}: </span>
        <span>{projectDetails[field] ? 'Ativo' : 'Desativado'}</span>
        <button
          className='btn btn-sm edit-btn'
          onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
        >
          {editSVG}
        </button>
        {
        editMode[field] && (
          <>
            <select
              name={field}
              value={editedDetails[field] || ''}
              onChange={(event) => handleChange(field, event)}
            >
              <option value={ 1 }>Ativar</option>
              <option value={ 0 }>Desativar</option>
            </select>
            <button
              className='btn btn-sm confirm-btn'
              onClick={(event) => handleUpdate(event, field)}
            >
              {confirmSVG}
            </button>
            <button
              className='btn btn-sm cancel-btn'
              onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
            >
              {cancelSVG}
            </button>
          </>
        )
      }

      </div>
    );
  };

  const renderTextCell = (name, field) => {
    return (
      <div className="edition-item text-item">
      <span>{ name }: </span>
      <span className='text-edit-content'>{ projectDetails[field] }</span>
      <button
        className='btn btn-sm edit-btn'
        onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
      >
        {editSVG}
      </button>
      {
        editMode[field] && (
          <>
            <textarea
              placeholder={projectDetails[field]}
              value={editedDetails[field]}
              onChange={(event) => handleChange(field, event)}
              name={field}
              >
            </textarea>
            <button
              className='btn btn-sm confirm-btn'
              onClick={ (event) => handleUpdate(event, field) }
            >
              { confirmSVG }
            </button>
            <button
              className='btn btn-sm cancel-btn'
              onClick={() => setEditMode({ ...editMode, [field]: !editMode[field] })}
            >
              { cancelSVG }
            </button>
          </>
        )
      }

    </div>
    );
  }

  const toggleAllEditModes = () => {
    const isAnyFieldInEditMode = Object.values(editMode).some(value => value === true);
  
    const updatedEditModes = Object.keys(editMode).reduce((acc, field) => {
      acc[field] = isAnyFieldInEditMode ? false : true;
      return acc;
    }, {});
  
    setEditMode(updatedEditModes);
  };


  return (
    <>
      <div id="project-show-container">
        <div className="text-center my-5">
          <h1>{projectDetails.name}</h1>
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
        <div className="project-info-container">

          <div>
            <div id="image-container">
              <img
                src={ projectDetails.image_url !== null ? `http://localhost/storage/${projectDetails.image_url}` : noImage }
                alt="Imagem do projeto"
              />
            </div>
          </div>
          <div id="project-show-edit-container">
            <div id="edit-header">
              <h4>Ficha tecnica:</h4>
              <button
                onClick={ toggleAllEditModes }
              >
                { editSVG }
              </button>
            </div>
            { renderFileCell('Imagem de capa', 'image_url') }
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
    </>
  );
}