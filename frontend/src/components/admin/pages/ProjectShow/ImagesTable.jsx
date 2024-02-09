import React, { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../images/projects/no-image.jpg';
import { deleteImage, fetchProjectImages } from '../../../../utils/ProjectsFetch';
import { toast } from 'react-toastify';
import './styles/imagesTable.css';

const deleteSVG = <FontAwesomeIcon icon={faTrash} />;
const updateSVG = <FontAwesomeIcon icon={faPenSquare} />;

export default function ImagesTable({ images }) {

  const { projectImages, setProjectImages } = useContext(ProjectsContext);

  const handleDelete = async (id, project_id) => {
    try {
      await toast.promise(
        deleteImage(id),
        {
          pending: 'Deletando imagem...',
          success: 'Imagem excluida com sucesso.',
          error: (error) => `Erro ao deletar imagem: ${error.message}`,
        }
      );
      const data = await fetchProjectImages(project_id);
      setProjectImages(data);
      console.log('DADOS de DELETEIMAGE', data);
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  }

  return (
    <div className="table-images-container d-flex flex-column align-items-center">
      <div className="images-search-control bg-dark w-100">
        <select name="" id="">
          <option value="asc">Mais antigas</option>
          <option value="desc">Mais recentes</option>
        </select>
        <button>
          Buscar
        </button>
      </div>
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
                <button 
                  onClick={ () => handleDelete(image.id, image.project_id) }
                  className="btn btn-dark btn-sm">{ deleteSVG }</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
