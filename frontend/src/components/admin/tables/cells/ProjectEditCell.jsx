// ProjectImageCell.js
import React, { useContext } from 'react';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons"

const cancelSVG = <FontAwesomeIcon icon={faXmark} />;
const updateSVG = <FontAwesomeIcon icon={faPenToSquare} />;
const checkSVG = <FontAwesomeIcon icon={faCheck} />;

export default function ProjectEditCell() {
  const { projectDetails, editedDetails, handleChange, editMode, setEditMode } = useContext(ProjectsContext);

  const handleEditClick = (field) => {
    setEditMode(prevMode => ({
      ...prevMode,
      [field]: !prevMode[field],
    }))
  };

  return (
    <>
      <td className="p-2 pst-head-cell">Image URL</td>
      <td className="p-2 pst-body-cell">
        <span>{projectDetails.image_url}</span>
        <button
          className='btn btn-sm btn-dark'
          onClick={handleEditClick}
        >{updateSVG}</button>
      </td>
      <td className='p-2'>
        <input
          type="text"
          placeholder="Image URL"
          value={editedDetails.image_url}
          onChange={(e) => handleChange('image_url', e.target.value)}
        />
      </td>
      <td className='p-2'>
        <button className='btn btn-sm btn-dark'>{checkSVG}</button>
        <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
      </td>
    </>
  );
};
