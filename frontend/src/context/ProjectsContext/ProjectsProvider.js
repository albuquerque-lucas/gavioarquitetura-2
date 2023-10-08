import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});

  const context = useMemo(() => ({
    isLoading,
    setIsLoading,
    projectList,
    setProjectList,
    projectDetails,
    setProjectDetails,
  }), [
    projectList,
    setProjectList,
    isLoading,
    setIsLoading,
    projectDetails,
    setProjectDetails,
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