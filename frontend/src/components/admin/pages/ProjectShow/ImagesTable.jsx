import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../images/projects/no-image.jpg';
import { deleteImage, fetchProjectImages, deleteSelectedImages } from '../../../../utils/ProjectsFetch';
import { toast } from 'react-toastify';
import './styles/imagesTable.css';

const deleteSVG = <FontAwesomeIcon icon={faTrash} />;

export default function ImagesTable({ images, projectId }) {

  const {
    setProjectImages,
    imagesSearchSort,
    setImagesSearchSort,
    selectAllImages,
    setSelectAllImages,
    projectImages,
  } = useContext(ProjectsContext);

  const handleDelete = async (id, projectId) => {
    try {
      await toast.promise(
        deleteImage(id),
        {
          pending: 'Deletando imagem...',
          success: 'Imagem excluida com sucesso.',
          error: (error) => `Erro ao deletar imagem: ${error.message}`,
        }
      );
      const data = await fetchProjectImages(projectId);
      setProjectImages(data);
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  }

  const handleSort = async (projectId, order) => {
    try {
      const data = await fetchProjectImages(projectId, order);
      console.log(data);
      setProjectImages(data);
    } catch( error) {
      console.error('Erro ao buscar imagens.', error);
    }
  }

  const onCheckboxChange = (image) => {
    setProjectImages((prevImages) =>
      prevImages.map((prevImage) =>
        prevImage.id === image.id ? { ...prevImage, selected: !prevImage.selected } : prevImage
      )
    );
    console.log(image);
  };

  const setSelectAllImagesAndSelected = (value) => {
    setSelectAllImages(value);
    setProjectImages((prevImages) =>
      prevImages.map((prevImage) => ({ ...prevImage, selected: value }))
    );
  };

  const handleDeleteSelected = async () => {
    const selectedImages = projectImages.filter((image) => image.selected);
  
    if (selectedImages.length > 0) {
      try {
        await toast.promise(
          deleteSelectedImages(selectedImages),
          {
            pending: 'Deletando imagens selecionadas...',
            success: 'Imagens selecionadas excluídas com sucesso.',
            error: (error) => `Erro ao deletar imagens selecionadas: ${error.message}`,
          }
        );
  
        const updatedList = await fetchProjectImages(projectId);
        setProjectImages(updatedList);
      } catch (error) {
        console.error('Erro ao deletar imagens selecionadas:', error);
      }
    } else {
      console.log('Nenhuma imagem selecionada para deletar.');
    }
  };
  

  return (
    <div className="table-images-container d-flex flex-column align-items-center">
      <div className="images-search-control bg-dark w-100">
        <select
          id=""
          value={ imagesSearchSort }
          onChange={(e) => setImagesSearchSort(e.target.value)}
          >
          <option value="asc">Mais antigas</option>
          <option value="desc">Mais recentes</option>
        </select>
        <button
        className='btn btn-light btn-hover'
          onClick={() => handleSort(projectId, imagesSearchSort) }
        >
          Buscar
        </button>
        {
          selectAllImages === false ?
          (
            <button
              className="btn btn-light btn-hover mx-3"
              onClick={ () => setSelectAllImagesAndSelected(true) }
            >
              Selecionar tudo
            </button>
          )
          :
          (
            <button
              className="btn btn-light btn-hover mx-3"
              onClick={ () => setSelectAllImagesAndSelected(false) }
            >
              Desmarcar tudo
            </button>)
        }

        { projectImages && projectImages.some((image) => image.selected) && (
          <button className="btn btn-light btn-hover" onClick={() => handleDeleteSelected()}>
            Apagar selecionados
          </button>
        )}
      </div>
      <table className="table table-hover table-bordered bg-primary project-images-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Excluir</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          { images && images.map((image, index) => (
            <tr key={ index }>
              <td className="images-id-cell">{ image.id }</td>
              <td>
                <img src={ image.image_path !== null ? `http://localhost/storage/${ image.image_path }` : noImage } alt="" />
              </td>
              <td className="images-btn-cell">
                <button 
                  onClick={ () => handleDelete(image.id, image.project_id) }
                  className="btn btn-dark btn-sm">{ deleteSVG }</button>
              </td>
              <td>
                <input
                  type="checkbox"
                  id={`select-image-${index}`}
                  checked={image.selected}
                  onChange={() => onCheckboxChange(image)}
                />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
