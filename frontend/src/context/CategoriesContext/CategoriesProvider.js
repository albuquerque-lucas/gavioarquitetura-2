import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import CategoriesContext from "./CategoriesContext";

export default function CategoriesProvider({ children }) {
  const [categoriesList, setCategoriesList] = useState([]);

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