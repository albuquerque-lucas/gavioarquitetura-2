import React, { useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { deleteProject } from '../../../../utils/ProjectsFetch';
import noImage from '../../../../images/projects/no-image.jpg';

const deleteSVG = <FontAwesomeIcon icon={ faTrash } />;
const updateSVG = <FontAwesomeIcon icon={ faPenToSquare } />;

export default function ProjectItem(props) {
  const { project } = props;
  const { id, name, area, image_url } = project;
  const { setProjectList } = useContext(ProjectsContext);

  const handleDelete = async (id) => {
    try {
      const data = await deleteProject(id);
      if (data.deleted) {
        setProjectList((prevState) => prevState.filter((project) => project.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
    }
  };

  return (
    <tr className='table-cell'>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ area }</td>
      <td className='table-img-container'>
        <img
          src={image_url !== null ? `http://localhost/storage/${image_url}` : noImage}
          alt=""
        />
      </td>
      <td className='table-btn-container'>
        <Link to={`/projects/${ project.id }`}>
          <button className="btn btn-dark">{ updateSVG }</button>
        </Link>
        <button className="btn btn-dark" onClick={() => handleDelete(project.id)}>{ deleteSVG }</button>
      </td>
    </tr>
  );
}