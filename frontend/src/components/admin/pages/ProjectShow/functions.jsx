import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const editSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
const cancelSVG = <FontAwesomeIcon icon={ faXmark } />;
const confirmSVG = <FontAwesomeIcon icon={ faCheck } />;


export const renderProjectInfoItem = (label, value) => {
  return (
    <div className="project-show-info-item">
      <span>{label}:&nbsp;</span>
      <span className='info-item-value'>{value}</span>
      <Link>
        {editSVG}
      </Link>
    </div>
  );
  
}

export const renderInputField = (type, name, value, data = []) => {
  console.log('functions', data);
  let inputField;

  switch (type) {
    case 'file':
      inputField = <input type="file" name={name} id={name} />;
      break;
    case 'select':
      inputField = (
        <select name={name} id={name}>
          { data.map((item) => {
            return <option value={item.id}>{item.name}</option>
          }) }
        </select>
      );
      break;
    default:
      inputField = <input type="text" name={name} id={name} value={value} />;
  }

  return (
    <div className="project-show-info-input">
      {inputField}
      <button className='confirm-edit-btn'>{confirmSVG}</button>
      <button className='cancel-edit-btn'>{cancelSVG}</button>
    </div>
  );
}