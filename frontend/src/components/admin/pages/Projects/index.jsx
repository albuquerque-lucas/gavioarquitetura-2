import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InnerOptionsNavbar from '../../assets/InnerOptionsNavbar';
import ProjectRow from './ProjectRow';
import Loading from '../../assets/Loading';
import ProjectsFilters from './ProjectsFilters';
import PaginationButtons from './PaginationButtons';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjects, deleteProject, fetchByCategory } from '../../../../utils/ProjectsFetch';
import { toast } from 'react-toastify';
import './styles/style.css';

export default function Projects() {
  const {
    setProjectList,
    projectList,
    setNavigationLinks,
    selectedCategoryId,
    setNextPageLink,
    setPreviousPageLink,
    paramsList,
  } = useContext(ProjectsContext);
  const {
    setIsLoading,
    isLoading,
  } = useContext(GeneralDataContext);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        setIsLoading(true);
        if (selectedCategoryId !== null) {
          data = await fetchByCategory(selectedCategoryId);
        } else {
          data = await fetchProjects('http://localhost/api/projects',
          paramsList.order,
          paramsList.hasAttribute,
          paramsList.attribute,
          selectedCategoryId,
          );
        }
        console.log("DATA", data);
        console.log('PARAMS LIST HAS ATTRIBUTE', paramsList.hasAttribute);
        const navLinks = data.links.slice(1, -1);
        setNavigationLinks(navLinks);
        setNextPageLink(data.next_page_url);
        setPreviousPageLink(data.prev_page_url);
        setProjectList(data.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setProjectList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await toast.promise(
        deleteProject(id),
        {
          pending: 'Deletando projeto...',
          success: 'Projeto deletado com sucesso.',
          error: (error) => `Erro ao deletar o projeto: ${error.message}`,
        }
      );
      const { data } = await fetchProjects('http://localhost/api/projects');
      setProjectList(data);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
    } finally {
      setIsLoading(false)
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
        </InnerOptionsNavbar>
      </div>
      <ProjectsFilters />
      <PaginationButtons />
      <div id="project-table-container">
          <table id="project-table-admin">
            <thead>
              <tr>
                <th className='col-1' >#</th>
                <th className='col-1' >Nome</th>
                <th className='col-2' >Capa</th>
                <th className='col-1' >Data</th>
                <th className='col-1' >Pagina Inicial</th>
                <th className='col-1' >Categoria</th>
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
