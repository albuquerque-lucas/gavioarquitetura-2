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
    lastPage,
    nextPage,
    currentPage,
    queryParams,
  } = useContext(ProjectsContext);

  const { categoriesList } = useContext(CategoriesContext);

  const handleCategoryFilter = async (id = null) => {
    setSelectedCategoryId(id);
    let data;
    try {
      if (id === null) {
        data = await fetchProjects(`http://localhost/api/projects?${queryParams}`);
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

  const handleSelectedFilter = async (filter, sortOrder) => {
    try {
      
      const filterInfo = translateFilter(filter);
      const response = await fetchProjects(
        'http://localhost/api/projects',
        sortOrder,
        filterInfo[1],
        filterInfo[0]);
      
      console.log('FILTER INFO:', filterInfo);

      setNavigationLinks(response.links.slice(1, -1));
      setNextPageLink(response.next_page_url);
      setPreviousPageLink(response.prev_page_url);
      setCurrentPage(1);
      setProjectList(response.data);
      setLastPage(response.last_page_url);
      console.log('NEXT PAGE', nextPage);
      console.log('CURRENT PAGE', currentPage);
      console.log('LAST PAGE', lastPage);
      console.log('RESPONSE', response);

    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  }

  const translateFilter = (filter) => {
    let translatedFilter;
    let completeFilter;
    let withAttribute = true;

    switch (filter) {
      case 'id':
        translatedFilter = 'id';
        completeFilter = {
          filterName: translatedFilter,
          hasAttribute: true,
        }
        break;
      case 'name':
        translatedFilter = 'name';
        completeFilter = [translatedFilter, withAttribute];
        break;
      case 'active_carousel':
        translatedFilter = 'active_carousel';
        completeFilter = [translatedFilter, withAttribute];
        break;
      case 'innactive_carousel':
        translatedFilter = 'active_carousel';
        withAttribute = false;
        completeFilter = [translatedFilter, withAttribute];
        break;
      case 'with_image':
        translatedFilter = 'image_url';
        completeFilter = [translatedFilter, withAttribute];
        break;
      case 'without_image':
        translatedFilter = 'image_url';
        withAttribute = false;
        completeFilter = [translatedFilter, withAttribute];
        break;
      default:
        completeFilter = ['', !withAttribute];
        break;
    }
  
    return completeFilter;
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
          onClick={() => handleSelectedFilter(selectedFilter, selectedSearchSort)}
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
