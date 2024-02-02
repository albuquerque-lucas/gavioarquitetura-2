import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../images/projects/no-image.jpg';
import { mapCategory } from '../../../../utils/mappers';

const checkSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
const trashSVG = <FontAwesomeIcon icon={ faTrash } />;

export default function ProjectRow({ project, deleteFunction }) {

  return (
    <tr key={ project.id }>
      <td>{ project.id }</td>
      <td>{ project.name }</td>
      <td>
        <img
          src={project.image_url !== null ? `http://localhost/storage/${project.image_url}` : noImage}
          alt="Imagem da lista de projetos"
        />
      </td>
      <td>{ project.year }</td>
      <td>{ project.active_carousel ? 'Exibir' : 'Nao exibir' }</td>
      <td>{ mapCategory(project.category_id) }</td>
      <td>
        <Link to={ `/projects/${project.id}` } className='edit-project-btn'>
          {checkSVG}
        </Link>
        -
        <button className='delete-project-btn' onClick={() => deleteFunction(project.id)} >
          {trashSVG}
        </button>
      </td>
    </tr>
  );
}