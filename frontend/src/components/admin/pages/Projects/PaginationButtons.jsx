import React from 'react';
import './styles/paginationButtons.css';

export default function PaginationButtons ({ currentPage, setCurrentPage, lastPage, navigationLinks })  {
  return (
    <div id='navigation-btn-container'>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {navigationLinks.map((link) => (
        <button
          key={link.label}
          onClick={() => setCurrentPage(Number(link.url.split('page=')[1]))}
          disabled={link.active}
        >
          {link.label}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
};
