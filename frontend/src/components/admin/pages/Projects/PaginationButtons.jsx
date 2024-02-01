import React, { useEffect, useContext } from 'react';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProjects } from '../../../../utils/ProjectsFetch';
import './styles/paginationButtons.css';

export default function PaginationButtons ()  {

  const {
    navigationLinks,
    nextPageLink,
    previousPageLink,
    setProjectList,
    setNavigationLinks,
    setNextPageLink,
    setPreviousPageLink,
    setLastPage,
    paramsList,
  } = useContext(ProjectsContext);

  const { setIsLoading } = useContext(GeneralDataContext);


  const handleClick = async (link) => {
    if (link !== null) {
      console.log(`${link}`);
      try {
        setIsLoading(true);
        
        const data = await fetchProjects(
          link,
          paramsList.order,
          paramsList.hasAttribute,
          paramsList.attribute);

        const navLinks = data.links.slice(1, -1);
        setNavigationLinks(navLinks);
        setNextPageLink(data.next_page_url);
        setPreviousPageLink(data.prev_page_url);
        setLastPage(data.last_page);
        setProjectList(data.data);
        console.log("NAVLINKS", navLinks);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  
  return (
    <div id='navigation-btn-container'>
      <button
        onClick={() => handleClick(previousPageLink)}
        disabled={previousPageLink === null}
      >
        Previous
      </button>
      {navigationLinks.map((link) => (
        <button
          key={link.label}
          onClick={() => handleClick(link.url)}
          disabled={link.active}
        >
          {link.label}
        </button>
      ))}
      <button
        onClick={() => handleClick(nextPageLink)}
        disabled={nextPageLink === null}
      >
        Next
      </button>
    </div>
  );
};
