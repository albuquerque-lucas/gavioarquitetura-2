import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [editMode, setEditMode] = useState({
    image_url: false,
    active_carousel: false,
    name: false,
    category: false,
    area: false,
    address: false,
    description: false,
  });
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    area: "",
    year: "",
    address: "",
    image_url: "",
    category_id: "0",
    active_carousel: false,
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
      projectList,
      setProjectList,
      projectDetails,
      setProjectDetails,
      editedDetails,
      setEditedDetails,
      handleChange,
      editMode,
      setEditMode,
      projectFormData,
      setProjectFormData,
    };
  }, [
    projectList,
    setProjectList,
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    editMode,
    setEditMode,
    projectFormData,
    setProjectFormData,
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
