import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../images/projects/no-image.jpg';
import './styles/imagesTable.css';

const deleteSVG = <FontAwesomeIcon icon={faTrash} />;
const updateSVG = <FontAwesomeIcon icon={faPenSquare} />;

export default function ImagesTable({ images }) {
  console.log('IMAGEM DO PROJETO', images);

  return (
    <div className="table-images-container d-flex flex-column align-items-center">
      <table className="table table-hover table-bordered bg-primary project-images-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Editar / Excluir</th>
          </tr>
        </thead>
        <tbody>
          { images && images.map((image, index) => (
            <tr key={ index }>
              <td className="images-id-cell">{ image.id }</td>
              <td>
                <img src={ image.image_path !== null ? `http://localhost/storage/projects/${ image.image_path }` : noImage } alt="" />
              </td>
              <td className="images-btn-cell">
                <button className="btn btn-dark btn-sm">{ updateSVG }</button>
                <button className="btn btn-dark btn-sm">{ deleteSVG }</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
