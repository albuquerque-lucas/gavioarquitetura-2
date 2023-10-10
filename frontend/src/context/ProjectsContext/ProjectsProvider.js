import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({});

  const handleChange = (field, value) => {
    setEditedDetails({
      ...editedDetails,
      [field]: value,
    });
  };

  const context = useMemo(() => ({
    isLoading,
    setIsLoading,
    projectList,
    setProjectList,
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    handleChange,
  }), [
    projectList,
    setProjectList,
    isLoading,
    setIsLoading,
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    handleChange,
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