import React, { useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { fetchProjectsList, fetchByCategory } from '../../../../utils/ProjectsFetch';
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
  } = useContext(ProjectsContext);

  const { categoriesList } = useContext(CategoriesContext);

  const handleCategoryFilter = async (id = null) => {
    let data;
    console.log("botao filtro categoria.")
    try {
      if (id === null) {
        data = await fetchProjectsList(`http://localhost/api/projects?page=1`);
        setProjectList(data.data);
        console.log("NAO tem id");
      } else {
        console.log("tem id");
        data = await fetchByCategory(id);
        setProjectList(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  }

  const handleSelectedFilter = (filter) => {
    
  }

  return (
    <>
      <div className="request-filter-container">
        <select
          name="select-filter"
          id="select-filter"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={ selectedFilter }
        >
          {
            projectFilter.map((item) => <option value={ item }> { item } </option>)
          }
        </select>
        <button
          className="btn btn-dark"
          onClick={ (e) => handleSelectedFilter(e.target.value) }
        >
          Filtrar
        </button>
      </div>
      <div className="request-filter-container">
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
          Ordenar
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
