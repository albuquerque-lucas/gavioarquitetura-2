import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from "react";
import CategoriesContext from "./CategoriesContext";

export default function CategoriesProvider({ children }) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/api/categories');
        const data = await response.json();
        setCategoriesList(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchData();
  }, []);

  const context = useMemo(() => {
    return {
      categoriesList,
      setCategoriesList,
    };
  }, [
      categoriesList,
      setCategoriesList,
  ]);

  return (
    <CategoriesContext.Provider value={context}>
      {children}
    </CategoriesContext.Provider>
  );
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};