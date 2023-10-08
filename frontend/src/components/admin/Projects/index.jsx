import React from 'react';
import './styles/style.css';
import noImage from '../../../images/projects/cover/no-image.jpg';

export default function Projects() {
  return (
    <>
      <div className="text-center my-5">
        <h1>Project List</h1>
      </div>
      <div className="d-flex justify-content-center">
      <div className="project-list-menu bg-dark w-75">
        <button className="btn btn-dark">
          Novo projeto
        </button>
      </div>

      </div>
      <div className="project-list-container d-flex flex-column align-items-center">
        <table className="table table-hover table-bordered mt-3 w-75">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Area</th>
                <th>Imagem</th>
                <th>Editar / Excluir</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
      </div>
    </>
  );
}