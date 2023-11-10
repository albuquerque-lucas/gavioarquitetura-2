import React, { useContext, useEffect } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons"
import { saveProject } from '../../../../utils/ProjectsFetch';
import './styles/projectShowTable.css';

const cancelSVG = <FontAwesomeIcon icon={ faXmark } />;
const updateSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
const checkSVG = <FontAwesomeIcon icon={ faCheck } />;

export default function ProjectShowTable() {
  const {
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    handleChange,
    editMode,
    setEditMode,
  } = useContext(ProjectsContext);
  
  useEffect(() => {
    setEditedDetails(projectDetails);
  }, [projectDetails]);

  const handleEditMode = (event, field) => {
    event.preventDefault();
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  }

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
  }

  const getOptions = (field) => {
    switch (field) {
      case 'category':
        return [
          { value: '1', label: 'Residencial' },
          { value: '2', label: 'Comercial' },
          { value: '3', label: 'Interiores' },
        ];
      case 'active_carousel':
        return [
          { value: true, label: 'Ativo' },
          { value: false, label: 'Inativo' },
        ];
      default:
        return [];
    }
  };

  const renderSelectField = (label, value, field) => {
    const options = getOptions(field);
    return (
      <div className="row">
      <div className="col-6 p-3 d-flex align-items-center info-edit-col">
        <span className='col-3'>
          {label}:&nbsp;
        </span>
        <span className='col-7 text-center'>
          {value}
        </span>
        <button
          className='btn btn-sm btn-dark mx-1 col-2'
          onClick={(event) => handleEditMode(event, field)}
        >
          {updateSVG}
        </button>
      </div>
      {editMode[field] ? (
      <div className="col p-2 input-edit-col">
        <div className="p-2 d-flex justify-content-center">
          <select
            value={editedDetails[field] ? editedDetails[field] : ''}
            onChange={(e) => handleChange(field, e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className='btn btn-sm btn-dark mx-1'
            onClick={(e) => handleUpdate(e, field)}
          >
            {checkSVG}
          </button>
          <button
            className='btn btn-sm btn-dark mx-1'
            onClick={(event) => handleEditMode(event, field)}
          >
            {cancelSVG}
          </button>
        </div>
      </div>
    ) : null}
    </div>
    )
  };

  const renderField = (label, value, field, placeholder, type='text') => (
    <div className="row">
      <div className="col-6 p-3 d-flex align-items-center info-edit-col">
        <span className='col-3'>
          {label}:&nbsp;
        </span>
        <span className='col-7 text-center'>
          {value}
        </span>
        <button
          className='btn btn-sm btn-dark mx-1 col-2'
          onClick={(event) => handleEditMode(event, field)}
        >
          {updateSVG}
        </button>
      </div>
      {editMode[field] ? (
      <div className="col p-2 input-edit-col">
        <div className="p-2 d-flex justify-content-center">
          <input
            type={type}
            placeholder={placeholder}
            value={editedDetails[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          <button
            className='btn btn-sm btn-dark mx-1'
            onClick={(e) => handleUpdate(e, field)}
          >
            {checkSVG}
          </button>
          <button
            className='btn btn-sm btn-dark mx-1'
            onClick={(event) => handleEditMode(event, field)}
          >
            {cancelSVG}
          </button>
        </div>
      </div>
    ) : null}
    </div>
  );

  return (
    <form action="" id='edit-project-form'>
      <div className="container">
        {renderField('Nome', projectDetails.name, 'name', 'Name')}
        {renderField('Imagem', projectDetails.name, 'image_url', 'Image URL', 'file')}
        {renderField('Area', projectDetails.area, 'area', 'Area')}
        {renderField('Data', projectDetails.year, 'year', 'Data')}
        {renderSelectField('Categoria', projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada', 'category', 'Categoria')}
        {renderField('Localizacao', projectDetails.address, 'address', 'Localizacao')}
        {renderField('Descricao', projectDetails.description, 'description', 'Descricao')}
        {renderSelectField('Exibir na pagina inicial', projectDetails.active_carousel, 'active_carousel', 'Active Carousel')}
      </div>
    </form>
  );
}
