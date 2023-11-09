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

  const handleEditMode = (event, field) => {
    event.preventDefault();
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
    console.log(field, editMode[field]);
  }

  const handleUpdate = async (event, field) => {
    event.preventDefault();
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

  useEffect(() => {
    setEditedDetails(projectDetails);
  }, [projectDetails]);

  const renderField = (label, value, field, placeholder) => (
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
            type="text"
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
    console.log(projectDetails);
  return (
    <form action="" id='edit-project-form'>
      <div className="container">
        {renderField('Nome', projectDetails.name, 'name', 'Name')}
        {renderField('Imagem', projectDetails.name, 'image_url', 'Image URL')}
        {renderField('Area', projectDetails.area, 'area', 'Area')}
        {renderField('Data', projectDetails.year, 'year', 'Data')}
        {renderField('Categoria', projectDetails.category.name, 'category.name', 'Categoria')}
        {renderField('Localizacao', projectDetails.address, 'address', 'Localizacao')}
        {renderField('Descricao', projectDetails.description, 'description', 'Descricao')}
        {renderField('Exibir na pagina inicial', projectDetails.active_carousel, 'active_carousel', 'Active Carousel')}
        {/* Adicione mais campos conforme necessário */}
      </div>
    </form>
  );
}
