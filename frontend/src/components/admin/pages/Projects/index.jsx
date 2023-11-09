import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import ProjectsTable from './ProjectsTable';
import './styles/style.css';

export default function Projects() {
  return (
    <>
      <div className="text-center my-5">
        <h1>Projetos</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="project-list-menu bg-dark w-75">
          <Link to="/projects/new-project" className="btn btn-dark">
            Novo projeto
          </Link>
        </div>
      </div>
      <div className="project-list-container d-flex flex-column align-items-center">
        <ProjectsTable />
      </div>
    </>
  );
}
