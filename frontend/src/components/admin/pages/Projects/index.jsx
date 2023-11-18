import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessageCard from '../../assets/MessageCard';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import ProjectRow from './ProjectRow';
import Loading from '../../assets/Loading';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjectsList, deleteProject } from '../../../../utils/ProjectsFetch';
import './styles/style.css';

export default function Projects() {
  const {
    setProjectList,
    projectList,
    currentPage,
    setCurrentPage,
    lastPage,
    setLastPage,
    navigationLinks,
    setNavigationLinks,
  } = useContext(ProjectsContext);
  const {
    setIsLoading,
    isLoading,
  } = useContext(GeneralDataContext);

  const messageVisible = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, last_page, links } = await fetchProjectsList(`http://localhost/api/projects?page=${currentPage}`);
        const navLinks = links.slice(1, -1);
        console.log(currentPage);
        setNavigationLinks(navLinks);
        setLastPage(last_page);
        setProjectList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setProjectList([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProjectList, setIsLoading, currentPage]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteProject(id);
      const { data } = await fetchProjectsList(`http://localhost/api/projects?page=${currentPage}`);
      setProjectList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      setIsLoading(false);
    }
  }


  return (
    <div id='project-list-container'>
      <div className="text-center my-5">
        <h1>Projetos</h1>
      </div>
      <div className="message-container">
        { messageVisible && <MessageCard/>}
      </div>
      <div className="inner-options-container">
        <InnerOptionsNavbar>
          <Link to="/projects/new-project" className="btn btn-dark">
            Novo projeto
          </Link>
        </InnerOptionsNavbar>
      </div>
      <div id='navigation-btn-container'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {
          navigationLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setCurrentPage(Number(link.url.split('page=')[1]))}
              disabled={link.active}
            >
              {link.label}
            </button>
          ))
        }
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
          </div>
      <div id="project-table-container">
          <table id="project-table-admin">
            <thead>
              <tr>
                <th className='col-1' >#</th>
                <th className='col-1' >Nome</th>
                <th className='col-2' >Capa</th>
                <th className='col-1' >Data</th>
                <th className='col-1' >Pagina Inicial</th>
                <th className='col-1' >Editar / Excluir</th>
              </tr>
            </thead>
        {isLoading ? (
            <Loading />
        ) : (
            <tbody>
              {projectList.length > 0 ? (
                projectList.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    deleteFunction={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Nenhum projeto encontrado</td>
                </tr>
              )}
            </tbody>
        )}
          </table>
        </div>
    </div>
  );
}
