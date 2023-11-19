import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import ProjectRow from './ProjectRow';
import Loading from '../../assets/Loading';
import ProjectsFilters from './ProjectsFilters';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjectsList, deleteProject } from '../../../../utils/ProjectsFetch';
import { toast } from 'react-toastify';
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
  }, [setIsLoading, currentPage]);

  const sortProjects = (filter) => {
    let sortProjects = [...projectList];
    console.log(sortProjects);
    switch (filter) {
      case 'recent':
        sortProjects.sort((a, b) => b.id - a.id);
        setProjectList(sortProjects);
        break;
      case 'latest':
        sortProjects.sort((a, b) => a.id - b.id);
        setProjectList(sortProjects);
        break;
      case 'activeCarousel':
        sortProjects.sort((a, b) => {
          if (a.active_carousel === true && b.active_carousel !== true) {
            return -1;
          } else if (!a.active_carousel && b.active_carousel) {
            return 1;
          } else {
            return 0;
          }
        });
        setProjectList(sortProjects);
        break;
      case 'inactiveCarousel':
        sortProjects.sort((a, b) => {
          if (a.active_carousel && !b.active_carousel) {
            return 1;
          } else if (!a.active_carousel && b.active_carousel) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'byYearDesc':
        sortProjects.sort((a, b) => b.year - a.year);
        break;
      case 'alphabeticalAsc':
        sortProjects.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      default:
        break;
    }
  }

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await toast.promise(
        deleteProject(id),
        {
          pending: 'Deletando projeto...',
          success: 'Projeto deletado com sucesso! 👌',
          error: 'Erro ao deletar projeto.',
        }
      );
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
      <div className="inner-options-container">
        <InnerOptionsNavbar>
          <Link to="/projects/new-project" className="btn btn-dark">
            Novo projeto
          </Link>
          <ProjectsFilters
            projectList={projectList}
            setProjectList={setProjectList}
          />
          {/* <div className="filter-container">
            <label htmlFor="filter">Ordenar por: </label>
            <select name="filter" id="filter">
              <option value="recent">Mais recentes</option>
              <option value="latest">Mais antigos</option>
              <option value="activeCarousel">Exibidos na pagina inicial</option>
              <option value="inactiveCarousel">Nao exibidos na pagina inicial</option>
              <option value="alphabeticalAsc">Nome</option>
              <option value="byYearDesc">Data</option>
            </select>
            <button
              onClick={() => sortProjects(document.getElementById('filter').value)}
            >Ordenar</button>
          </div> */}
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
