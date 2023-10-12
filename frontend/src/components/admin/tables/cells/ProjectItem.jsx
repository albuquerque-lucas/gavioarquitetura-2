import React, { useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import noImage from '../../../../images/projects/no-image.jpg';

const deleteSVG = <FontAwesomeIcon icon={ faTrash } />;
const updateSVG = <FontAwesomeIcon icon={ faPenToSquare } />;

export default function ProjectItem(props) {
  const { project } = props;
  const { id, name, area } = project;
  const { setProjectList } = useContext(ProjectsContext);

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1/api/projects/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.projects) {
      setProjectList(data.projects);
    }
    console.log(data.message, id);
  };

  return (
    <tr className='table-cell'>
    <td>{ id }</td>
    <td>{ name }</td>
    <td>{ area }</td>
    <td className='table-img-container'>
      <img src={ noImage } alt="" />
    </td>
    <td className='table-btn-container'>
      <Link to={`/projects/${ project.id }`}>
        <button className="btn btn-dark">{ updateSVG }</button>
      </Link>
      <button className="btn btn-dark" onClick={() => handleDelete(project.id)}>{ deleteSVG }</button>
    </td>
  </tr>
  )
}