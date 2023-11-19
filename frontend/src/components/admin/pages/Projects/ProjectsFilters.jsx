import React, { useState } from 'react';
import { mapSelectedFilter } from '../../../../utils/mappers';
import './styles/filterContainer.css';

export default function ProjectsFilters({ projectList, setProjectList }) {
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [clickedFilter, setClickedFilter] = useState('');

  const sortProjects = (filter) => {
    let sortProjects = [...projectList];
    setClickedFilter(filter);
    console.log(clickedFilter)
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
        setProjectList(sortProjects);
        break;
      case 'byYearDesc':
        sortProjects.sort((a, b) => b.year - a.year);
        setProjectList(sortProjects);
        break;
      case 'alphabeticalAsc':
        sortProjects.sort((a, b) => a.name.localeCompare(b.name));
        setProjectList(sortProjects);
        break;
      default:
        break;
    }
  }

  return (
    <div className="filter-container">
    <span>{`Filtro selecionado: ${mapSelectedFilter(clickedFilter)}`}</span>
    <label htmlFor="filter">Ordenar por: </label>
    <select
      name="filter"
      id="filter"
      onChange={(e) => setSelectedFilter(e.target.value)}
      >
      <option value="recent">Mais recentes</option>
      <option value="latest">Mais antigos</option>
      <option value="activeCarousel">Exibidos na pagina inicial</option>
      <option value="inactiveCarousel">Nao exibidos na pagina inicial</option>
      <option value="alphabeticalAsc">Nome</option>
      <option value="byYearDesc">Data</option>
    </select>
    <button
      onClick={() => sortProjects(selectedFilter)}
      className='btn btn-dark'
    >
      Ordenar
    </button>
  </div>
  )
}