import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import InnerOptionsNavbar from "../../assets/InnerOptionsNavbar";

export default function NewProject() {
  return (
    <>
      <div className='text-center my-5'>
        <h1>Adicionar Projeto</h1>
      </div>
      <div className="d-flex justify-content-center">
        <InnerOptionsNavbar>
          <Link to="/projects" className="btn btn-dark">
            Voltar
          </Link>
        </InnerOptionsNavbar>
      </div>
      <div className="project-list-container d-flex flex-column align-items-center">
        <ProjectForm />
      </div>
    </>
    
  )
}