import React from 'react';
import ProjectTable from './project-table';
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
        <ProjectTable />
      </div>
    </>
  );
}