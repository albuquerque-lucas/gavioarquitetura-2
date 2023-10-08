import React from 'react';
import './styles/style.css';

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
        <table className="table table-bordered mt-3 w-75">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Imagem</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
      </div>
    </>
  );
}