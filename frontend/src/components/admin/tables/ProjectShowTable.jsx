import React, { useContext, useEffect } from 'react';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons"
import './styles/projectShowTable.css';

const cancelSVG = <FontAwesomeIcon icon={ faXmark } />;
const updateSVG = <FontAwesomeIcon icon={ faPenToSquare } />;
const checkSVG = <FontAwesomeIcon icon={ faCheck } />;

export default function ProjectShowTable() {
  const {
    projectDetails,
    editedDetails,
    setEditedDetails,
    handleChange,
  } = useContext(ProjectsContext);

  useEffect(() => {
    setEditedDetails(projectDetails);
  }, [projectDetails]);

  return (
    <form action="">
              <table className="table">
                <tbody>
                <tr>
                  <td className="p-2 pst-head-cell">Image URL</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.image_url}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editedDetails.image_url}
                      onChange={(e) => handleChange('image_url', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Active Carousel</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.active_carousel}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Active Carousel"
                      value={editedDetails.active_carousel}
                      onChange={(e) => handleChange('active_carousel', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Name</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.name}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={editedDetails.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Category</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.category ? projectDetails.category.name : 'Categoria nao encontrada'}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Category"
                      value={editedDetails.category ? editedDetails.category.name : 'Categoria nao encontrada'}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Area</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.area}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Area"
                      value={editedDetails.area}
                      onChange={(e) => handleChange('area', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Address</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.address}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Address"
                      value={editedDetails.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-2 pst-head-cell">Description</td>
                  <td className="p-2 pst-body-cell">
                    <span>{projectDetails.description}</span>
                    <button className='btn btn-sm btn-dark'>{updateSVG}</button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={editedDetails.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className='btn btn-sm btn-dark'>{checkSVG}</button>
                    <button className='btn btn-sm btn-dark'>{cancelSVG}</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </form>
  );
}