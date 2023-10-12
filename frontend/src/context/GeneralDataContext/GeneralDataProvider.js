import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import GeneralDataContext from "./GeneralDataContext";

export default function GeneralDataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const context = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    };
  }, [
      isLoading,
      setIsLoading,
  ]);

  return (
    <GeneralDataContext.Provider value={context}>
      {children}
    </GeneralDataContext.Provider>
  );
}

GeneralDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};