import noImage from '../../../images/projects/no-image.jpg';

export default function ProjectItem() {
  return (
    <tr className='table-cell'>
    <td>1</td>
    <td>Projeto 1</td>
    <td>200m²</td>
    <td class='table-img-container'>
      <img src={noImage} alt="" />
    </td>
    <td class='table-btn-container'>
      <button className="btn btn-dark">Editar</button>
      <button className="btn btn-dark">Excluir</button>
    </td>
  </tr>
  )
}