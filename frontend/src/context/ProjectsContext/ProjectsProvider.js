import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useMemo(() => ({
    isLoading,
    setIsLoading,
    projectList,
    setProjectList,
  }), [
    projectList,
    setProjectList,
    isLoading,
    setIsLoading,
  ]);

  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
}

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}