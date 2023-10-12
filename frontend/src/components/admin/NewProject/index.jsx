import { Link } from "react-router-dom";
import ProjectForm from "../forms/ProjectForm";

export default function NewProject() {
  return (
    <>
      <div className='text-center my-5'>
        <h1>Adicionar Projeto</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="project-list-menu bg-dark w-75">
          <Link to="/projects" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </div>
      <div className="project-list-container d-flex flex-column align-items-center">
        <ProjectForm />
      </div>
    </>
    
  )
}