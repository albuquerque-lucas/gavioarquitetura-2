import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../images/projects/no-image.jpg';

const checkSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
const trashSVG = <FontAwesomeIcon icon={ faTrash } />;

export default function ProjectRow({ project }) {
  return (
    <tr key={project.id}>
      <td>{project.id}</td>
      <td>{project.name}</td>
      <td>
        <img
          src={project.image_url !== null ? `http://localhost/storage/${project.image_url}` : noImage}
          alt="Imagem da lista de projetos"
        />
      </td>
      <td>{project.date}</td>
      <td>
        <Link to={`/projects/${project.id}`}>
          {checkSVG}
        </Link>
        -
        <Link to={`/projects/delete/${project.id}`}>
          {trashSVG}
        </Link>
      </td>
    </tr>
  );
}