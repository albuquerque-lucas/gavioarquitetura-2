import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import noImage from '../../../images/projects/no-image.jpg';
import './styles/imagesTable.css';

const deleteSVG = <FontAwesomeIcon icon={ faTrash } />;
const updateSVG = <FontAwesomeIcon icon={ faPenToSquare } />;

export default function ImagesTable() {
  return (
    <div className="table-images-container">
      <table className="table table-hover table-bordered mt-3 bg-primary">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Editar / Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="images-id-cell">1</td>
            <td>
              <img src={ noImage } alt="" />
            </td>
            <td className="images-btn-cell">
              <button className="btn btn-dark">{ updateSVG }</button>
              <button className="btn btn-dark">{ deleteSVG }</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}