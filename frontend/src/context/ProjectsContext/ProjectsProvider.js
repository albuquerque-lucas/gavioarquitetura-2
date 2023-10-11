import PropTypes from 'prop-types';
import { useMemo, useState, useCallback } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState({
    image_url: false,
    active_carousel: false,
    name: false,
    category: false,
    area: false,
    address: false,
    description: false,
  });
  const [projectList, setProjectList] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({});

  const context = useMemo(() => {
    const handleChange = (field, value) => {
      setEditedDetails({
        ...editedDetails,
        [field]: value,
      });
    };

    return {
      isLoading,
      setIsLoading,
      projectList,
      setProjectList,
      projectDetails,
      setProjectDetails,
      editedDetails,
      setEditedDetails,
      handleChange,
      editMode,
      setEditMode,
    };
  }, [
    projectList,
    setProjectList,
    isLoading,
    setIsLoading,
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    editMode,
    setEditMode,
  ]);

  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
}

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
