import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../images/projects/no-image.jpg';
import './styles/imagesTable.css';

const deleteSVG = <FontAwesomeIcon icon={faTrash} />;
const updateSVG = <FontAwesomeIcon icon={faPenSquare} />;

export default function ImagesTable({ images }) {
  console.log(images);

  return (
    <div className="table-images-container d-flex flex-column align-items-center">
      <table className="table table-hover table-bordered mt-3 bg-primary w-50">
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
                <img src={ image.image_url !== null ? `http://localhost/storage/${image.image_url}` : noImage } alt="" />
              </td>
              <td className="images-btn-cell">
                <button className="btn btn-dark">{ updateSVG }</button>
                <button className="btn btn-dark">{ deleteSVG }</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
