import noImage from '../../../images/projects/no-image.jpg';

export default function ProjectItem(props) {
  const { project } = props;
  const { id, name, area, image } = project;
  console.log(project.id);

  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1/api/projects/${id}`, {
      method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
};

  return (
    <tr className='table-cell'>
    <td>{ id }</td>
    <td>{ name }</td>
    <td>{ area }</td>
    <td className='table-img-container'>
      <img src={noImage} alt="" />
    </td>
    <td className='table-btn-container'>
      <button className="btn btn-dark">Editar</button>
      <button className="btn btn-dark" onClick={handleDelete}>Excluir</button>
    </td>
  </tr>
  )
}