import React, { useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { fetchProjects, fetchByCategory } from '../../../../utils/ProjectsFetch';
import CategoriesContext from '../../../../context/CategoriesContext/CategoriesContext';
import './styles/filterContainer.css';

export default function ProjectsFilters() {

  const {
    setProjectList,
    selectedSearchSort,
    setSelectedSearchSort,
    projectFilter,
    selectedFilter,
    setSelectedFilter,
    setSelectedCategoryId,
    setNavigationLinks,
    setCurrentPage,
    setLastPage,
    setNextPageLink,
    setPreviousPageLink,
  } = useContext(ProjectsContext);

  const { categoriesList } = useContext(CategoriesContext);

  const handleCategoryFilter = async (id = null) => {
    setSelectedCategoryId(id);
    let data;
    try {
      if (id === null) {
        data = await fetchProjects(`http://localhost/api/projects?page=1`);
      } else {
        data = await fetchByCategory(id);
      }

      console.log("Data", data);

      const navLinks = data.links.slice(1, -1);
      setNavigationLinks(navLinks);
      setNextPageLink(data.next_page_url);
      setPreviousPageLink(data.prev_page_url);
      setCurrentPage(1);
      setProjectList(data.data);
      setLastPage(data.last_page);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  }

  const handleSelectedFilter = (filter) => {
    console.log("selected Filter", filter);
  }

  return (
    <>
      <div className="request-filter-container">
        <select
          name="select-filter"
          id="select-filter"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
        >
          {Object.entries(projectFilter).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="search-order"
          id="search-order"
          onChange={(e) => setSelectedSearchSort(e.target.value)}
          value={ selectedSearchSort }
        >
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
        <button
          className="btn btn-dark"
        >
          Buscar
        </button>
      </div>
      <div className="category-filter-container">
        <button
          className="btn btn-dark mx-3"
          onClick={ () => handleCategoryFilter() }
        >
          Todos
        </button>
        {
          categoriesList.map((category) => (
            <button
              key={ category.id }
              className="btn btn-dark mx-3"
              onClick={ () => handleCategoryFilter(category.id) }
            >
              { category.name }
            </button>
          ))
        }
      </div>
    </>
  );
}
