import React, { useState, useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import { fetchProjectsList } from '../../../../utils/ProjectsFetch';
import { mapSelectedFilter } from '../../../../utils/mappers';
import './styles/filterContainer.css';

export default function ProjectsFilters({ listOfProjects, setListFunction }) {
  const [selectedFilter, setSelectedFilter] = useState('idRecent');
  const [clickedFilter, setClickedFilter] = useState('');
  const [selectedSort, setSelectedSort] = useState('asc');
  const {
    setProjectList,
    selectedSearchSort,
    setSelectedSearchSort,
  } = useContext(ProjectsContext);

  const sortProjects = (filter) => {
    let sortProjects = [...listOfProjects];
    setClickedFilter(filter);

    switch (filter) {
      case 'idRecent':
        sortProjects.sort((a, b) => (selectedSort === 'asc' ? a.id - b.id : b.id - a.id));
        break;
      case 'activeCarousel':
        sortProjects.sort((a, b) => {
          if (selectedSort === 'asc') {
            return a.active_carousel === true && b.active_carousel !== true ? -1 : 0;
          } else {
            return a.active_carousel === true && b.active_carousel !== true ? 0 : 1;
          }
        });
        break;
      case 'inactiveCarousel':
        sortProjects.sort((a, b) => {
          if (selectedSort === 'asc') {
            return a.active_carousel && !b.active_carousel ? 1 : 0;
          } else {
            return a.active_carousel && !b.active_carousel ? 0 : -1;
          }
        });
        break;
      case 'byYearDesc':
        sortProjects.sort((a, b) => (selectedSort === 'asc' ? a.year - b.year : b.year - a.year));
        break;
      case 'alphabeticalAsc':
        sortProjects.sort((a, b) =>
          selectedSort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        break;
      default:
        break;
    }

    setListFunction(sortProjects);
  };

  const handleSearch = async () => {
    console.log('SEARCH SORT', selectedSearchSort);
    const url = `http://localhost/api/projects?page=1`;
    try {
      const { data } = await fetchProjectsList(url, selectedSearchSort);
      setProjectList(data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  return (
    <>
      <div className="filter-container">
        <span>{`Filtro selecionado: ${mapSelectedFilter(clickedFilter)} ${selectedSort}`}</span>
        <label htmlFor="filter">Ordenar por: </label>
        <select name="filter" id="filter" onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="idRecent">Identificador único</option>
          <option value="activeCarousel">Exibidos na página inicial</option>
          <option value="inactiveCarousel">Não exibidos na página inicial</option>
          <option value="alphabeticalAsc">Nome</option>
          <option value="byYearDesc">Data</option>
        </select>
        <label htmlFor="asc-filter">Asc: </label>
        <input
          type="radio"
          name="sort-order"
          id="asc-filter"
          checked={selectedSort === 'asc'}
          onChange={() => setSelectedSort('asc')}
        />
        <label htmlFor="desc-filter">Desc: </label>
        <input
          type="radio"
          name="sort-order"
          id="desc-filter"
          checked={selectedSort === 'desc'}
          onChange={() => setSelectedSort('desc')}
        />
        <button onClick={() => sortProjects(selectedFilter)} className="btn btn-dark">
          Ordenar
        </button>
      </div>
      <div className="request-filter-container">
        <h6>Buscar projetos por ordem:</h6>
        <select
          name="search-order"
          id="search-order"
          onChange={(e) => setSelectedSearchSort(e.target.value)}
          defaultValue={selectedSearchSort}
        >
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
        </select>
        <button
          className="btn btn-dark"
          onClick={ handleSearch }
        >
          Buscar
        </button>
      </div>
    </>
  );
}
